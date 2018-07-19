import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import sslRedirect from './sslRedirect';
import resolvers from './graphql/resolvers';
import yelpRequest from './yelp';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

app.set('trust proxy');
app.use(sslRedirect);
app.use('/', express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const typeDefs = fs.readFileSync(path.resolve(__dirname, 'graphql/schema.gql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/graphql', graphqlExpress(req => ({ context: req.user, schema })));
if (env === 'development') {
  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

app.get('/yelp', (req, res, next) => {
  yelpRequest(req, res, next);
});

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  }
});

app.listen(port, () => {
  console.log('Server Started at port 3000');
});

import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const client = new ApolloClient({
  uri: '/graphql',
});

const renderer = createRenderer();

render(
  <ApolloProvider client={client}>
    <Provider renderer={renderer}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app'),
);

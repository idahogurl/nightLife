export default function (req, res, next) {
  console.log('env', process.env.NODE_ENV);
  console.log('url', req.url);
  console.log('secure', req.secure);
  console.log('protocol', req.protocol);
  console.log('header', req.headers['X-Forwarded-Proto']);
  if (process.env.NODE_ENV === 'production' && req.url !== '/graphql' && !req.secure) {
    const sslUrl = `https://${req.hostname}${req.url}`;
    console.log('redirect', sslUrl);
    return res.redirect(301, sslUrl);
  }

  return next();
}


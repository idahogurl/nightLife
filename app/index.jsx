import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import namedMediaQuery from 'fela-plugin-named-media-query';
import extend from 'fela-plugin-extend';

import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const { document } = window;
const client = new ApolloClient({
  uri: '/graphql',
});

const namedMediaQueryPlugin = namedMediaQuery({
  sm: '@media (min-width: 544px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
});

const renderer = createRenderer({ plugins: [extend(), namedMediaQueryPlugin] });

render(
  <ApolloProvider client={client}>
    <Provider renderer={renderer}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app'),
);

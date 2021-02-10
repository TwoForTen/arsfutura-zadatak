import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import './style/global.scss';

import reducers from './store';

const composeEnhancers =
  ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
  compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

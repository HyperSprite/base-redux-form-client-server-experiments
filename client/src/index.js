import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';


import routes from './router';
import store from './store';

import './styles/main.css';

import App from './components/app';


render(
  <Provider store={store}>
    <Router>
      <App >{ routes }</App>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

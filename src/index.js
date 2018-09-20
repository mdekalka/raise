import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';

import './interceptors/interceptors'
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/store'
import App from './App';

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
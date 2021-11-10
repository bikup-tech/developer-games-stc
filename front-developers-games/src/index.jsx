import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';

import configureStore from './redux/store/configureStore';
import initialState from './redux/store/initialState';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore(initialState)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

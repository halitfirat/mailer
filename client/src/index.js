import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';
import store from './store';

toast.configure({
  autoClose: 1500
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

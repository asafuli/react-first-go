import React from 'react';
import ReactDOM from 'react-dom';
import logger from './services/loggerService';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import 'font-awesome/css/font-awesome.css'

logger.init();

ReactDOM.render(
<CookiesProvider>
  <BrowserRouter> 
    < App / > 
  </BrowserRouter>
</CookiesProvider>,
 document.getElementById('root'));
registerServiceWorker();

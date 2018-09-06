import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import logger from './services/loggerService';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import 'font-awesome/css/font-awesome.css'
import registerServiceWorker from './registerServiceWorker';

logger.init();

ReactDOM.render(
<BrowserRouter> 
  < App / > 
</BrowserRouter> ,
 document.getElementById('root'));
registerServiceWorker();

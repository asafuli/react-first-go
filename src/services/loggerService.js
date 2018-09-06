import Raven from 'raven-js';

function init(){
  Raven.config('https://d48587819c8f42659f784de22c1a6116@sentry.io/1274822').install();
}

function log(error){
  console.log('calling raven with error: ',error);
  Raven.captureException(error);
}

export default {
  init,
  log,
}
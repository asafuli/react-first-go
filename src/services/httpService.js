import axios from 'axios';
import logger from './loggerService';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  
  if (!expectedError){
    logger.log(error);
    toast.error('An unexpected error has occurred');
  }
  
  //Promise.reject will return the promise with the error to the next try-catch phrase
  return Promise.reject(error);
 
})

export function setJwt(jwt){
  //In order to send the jwt to the server as a customized header (otherwise we will get 401)
  axios.defaults.headers.common['x-auth-token'] = jwt;
}


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
}
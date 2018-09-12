import http from './httpService';
import { authEndPoint } from '../config/config.json';

export function login(email, password){
  return http.post(authEndPoint, { email, password });
}
import http from './httpService';
import {usersEndPoint} from '../config/config.json';

export function register(user){
  return http.post(usersEndPoint, {
    "name": user.name,
    "email": user.username,
    "password": user.password
  })
}
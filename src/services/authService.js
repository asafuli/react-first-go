import http from './httpService';
import jwtDecode from 'jwt-decode';
//import { authEndPoint } from '../config/config.json';

const authEndPoint = '/auth';
//***Check why tokenKey is undefined inside getJwt()
//const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password){
const { data:jwt } = await http.post(authEndPoint, { email, password });
localStorage.setItem('token', jwt);
}

export function loginWithJwt(jwt){
  localStorage.setItem('token', jwt);
}

export function logout(){
  localStorage.removeItem('token');
}

export function getJwt(){
  console.log('reached getJwt', 'token')
  return localStorage.getItem('token');
}

export function getCurrentUser(){
   //wrapping in try-catch block in case we dont have any jwt in localSorage
   try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt); //return "user"
  } catch(ex) {
    return null
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};

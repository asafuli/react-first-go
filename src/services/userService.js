import http from './httpService';
//import {usersEndPoint} from '../config/config.json';

const usersEndPoint = '/users';

export function register(user){
  return http.post(usersEndPoint, {
    "name": user.name,
    "email": user.username,
    "password": user.password,
    "rentals" : []
  })
}

export function rentMovie(movie, user){
  if(user._id){
    const body = {...user};
    delete(body._id);
    delete(body.iat);
    if (!body.rentals.find(id => id === movie._id)){
      body.rentals.push(movie._id);
    }
    return http.put(`${usersEndPoint}/${user._id}`, body);
  }
}
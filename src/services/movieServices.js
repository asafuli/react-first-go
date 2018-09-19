import http from './httpService';
//import { moviesEndPoint } from '../config/config.json'

const moviesEndPoint = '/movies';

export function getMovies() {
  return http.get(moviesEndPoint);
}

export function getMovie(id) {
  return http.get(`${moviesEndPoint}/${id}`);
}

export function saveMovie(movie) {
  if(movie._id){
    const body = {...movie};
    delete(body._id);
    return http.put(`${moviesEndPoint}/${movie._id}`, body);
  } else {
    return http.post(moviesEndPoint, movie);
  }
}

export function deleteMovie(id) {
  return http.delete(`${moviesEndPoint}/${id}`);
}
  

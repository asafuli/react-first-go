import logger from './loggerService';
import http from './httpService';
import { moviesEndPoint } from '../config/config.json'

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
    logger.log('movie to save: ', movie);
    console.log('movie to save: ', movie);
    return http.post(moviesEndPoint, movie);
  }
}

export function deleteMovie(id) {
  return http.delete(`${moviesEndPoint}/${id}`);
}
  

import http from './httpService';
//import {genresEndPoint} from '../config/config.json';

const genresEndPoint = '/genres';

export function getGenres() {
  return http.get(genresEndPoint);
}
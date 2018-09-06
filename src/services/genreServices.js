import http from './httpService';
import {genresEndPoint} from '../config/config.json';

export function getGenres() {
  return http.get(genresEndPoint);
}
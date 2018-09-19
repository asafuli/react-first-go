import http from './httpService';
//import {genresEndPoint} from '../config/config.json';

const genresEndPoint = '/genres';

export function getGenres() {
  console.log("process.env : ", process.env);
  console.log("genres end point : ", genresEndPoint);
  console.log("call to get(genresendpoint) returned : ", http.get(genresEndPoint));
  return http.get(genresEndPoint);
}
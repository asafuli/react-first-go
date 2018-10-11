import http from './httpService';
//import {usersEndPoint} from '../config/config.json';

const usersEndPoint = '/users';

export async function register(user){
  try{
    return await http.post(usersEndPoint, {
      "name": user.name,
      "email": user.username,
      "password": user.password,
      "rentals" : []
    }, {withCredentials: true})
  } catch(e){
    console.log(e);
  }
}

export async function rentMovie(movie){

  const {data : user} =  await http.get(`${usersEndPoint}/me`, {withCredentials: true});
    if (!user.rentals.find(id => id === movie._id)){
      user.rentals.push(movie._id);
    } else {
      user.rentals = user.rentals.filter(id => id !== movie._id);
    }
    return http.patch(`${usersEndPoint}/${user._id}`, {rentals: user.rentals});
}

export async function getUserRentals(){
  const {data : user} =  await http.get(`${usersEndPoint}/me`, {withCredentials: true});
  return user.rentals
}

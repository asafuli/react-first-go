import React, { Component } from 'react';
import RentalsTable from './rentalsTable';
import {getUserRentals} from '../services/userService';
import {getMovies} from '../services/movieServices';

class Rentals extends Component {
  state = {}

  async componentDidMount() {
    const rentals = await getUserRentals();
    const {data : movies} = await getMovies();
    
    const filteredMovies = rentals.
    map(id => movies.find(mov => id === mov._id)).
    filter(id => id !== undefined);
    this.setState({movies: filteredMovies, rentals});
  }

  render() { 
    return (
    <div>
      {this.state.rentals && 
      this.state.movies &&
      <RentalsTable movies={this.state.movies}/>
      }
    </div>
    );
  }
}

 
export default Rentals;
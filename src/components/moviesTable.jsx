import React, { Component } from 'react';
import LikeBtn from './common/likeBtn';
import Table from './common/table';
import authService from '../services/authService';
import RentButton from './rentButton';
import {Link} from 'react-router-dom';


class MoviesTable extends Component {
  
  columns = [
    {path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {key: "like",
     content: movie => <LikeBtn liked={movie.liked} onPress={() => this.props.onLike(movie)}/>
    }, 
  ];

  deleteColumn = {key: "delete",
    content: movie => {
    return <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(movie)}>Delete</button>      
    }
  };

  rentColumn = {key: "rent",
    content: movie => {
      console.log("this.props.rentals : " , this.props.rentals);
      console.log("Movie id for ", movie.title, "is : ", movie._id);
      const isRented = !(undefined === this.props.rentals.find(id => id === movie._id)); 
      return <RentButton movie={movie} isRented={isRented} onPress={() => this.props.onRent(movie)}/>      
    }
  }

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user){
      this.columns.push(this.rentColumn);
      if(user.isAdmin){
        this.columns.push(this.deleteColumn);
      }
    }
  }


    render() { 
    const { movies, onSort, sortColumn, rentals } = this.props;
    return ( 
      <React.Fragment>
        {rentals &&
        <Table 
          items={movies} 
          columns={this.columns} 
          onSort={onSort} 
          sortColumn={sortColumn} 
        />
        }
      </React.Fragment>
    );
  }
}
export default MoviesTable;

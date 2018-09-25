import React, { Component } from 'react';
import LikeBtn from './common/likeBtn';
import Table from './common/table';
import authService from '../services/authService';
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

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin){
      this.columns.push(this.deleteColumn);
    }
  }
  
    render() { 
    const { movies, onSort, sortColumn } = this.props;
    return ( 
      <Table 
        items={movies} 
        columns={this.columns} 
        onSort={onSort} 
        sortColumn={sortColumn} 
      />
    );
  }
}
export default MoviesTable;

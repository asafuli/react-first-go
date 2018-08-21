import React, { Component } from 'react';
import LikeBtn from './common/likeBtn';
import Table from './common/table';


class MoviesTable extends Component {
  
  columns = [
    {path: 'title', label: 'Title'},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {key: "like",
     content: movie => <LikeBtn liked={movie.liked} onPress={() => this.props.onLike(movie)}/>
    },
    {key: "delete",
     content: movie => <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(movie)}>Delete</button>
    },
  ];

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

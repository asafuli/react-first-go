import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import {paginate} from '../utils/paginate';
import _ from 'lodash';


class Movies extends Component {

  state = {  
    /*initializing to empty array so we wont get runTime error of undefined 
      state attributes until 'componentDidMount' returns with details from backend
    */
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    //selectedGenre: {}, --> will be added during render in an if condition
    sortColumn: {path: 'title', order: 'asc'},
  }

  componentDidMount(){
    const genres = [{_id: '', name: 'All Genres'}, ...getGenres()]
    this.setState({genres, movies: getMovies()});
  }

  handleDelete = movie => {
    const newMovies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({movies: newMovies});
  }

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage: 1});
  }

  handleSort = sortColumn => {
    this.setState({sortColumn});
  }

  toggle = movie => {
    // NOTE : Spread operator performs shallow copy of objects!
    const newMovies = [ ...this.state.movies];
    const index = newMovies.indexOf(movie);
    // NOTE: Crucial to create a new object in order not to update the same object in existing state directly
    newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked 
    this.setState({movies: newMovies});
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  }

  getPagedData = () => {

    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

    const filteredMovies = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
      : allMovies;
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);  
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return {totalCount: sortedMovies.length, data: movies};
  }
  render() { 

    const { pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
    
    const {totalCount: count, data: movies } = this.getPagedData();

    return (count === 0 
      ? <p> There are no movies in the DB </p> 
      : 
      <div className='row'>
        <div className="col-3">
          <ListGroup 
            items={genres}
            selectedItem={selectedGenre} 
            textProperty={'name'}
            valueProperty={'_id'}
            onItemSelect={this.handleGenreSelect}
          />
        </div>  
        <div className="col">
          <p> There are {count} movies in the DB </p>
          <MoviesTable 
            movies={movies} 
            onDelete={this.handleDelete} 
            onLike={this.toggle} 
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination 
            pageSize={pageSize} 
            currentPage={currentPage} 
            totalCount={count} 
            onPageChange={this.handlePageChange}
          />
        </div>        
      </div>
    );
  }
}
 
export default Movies;
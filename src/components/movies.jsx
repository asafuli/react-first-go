import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import {paginate} from '../utils/paginate';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SearchBox from './common/searchBox';

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
    searchStr: '',
    selectedGenre: null,
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
    this.setState({selectedGenre: genre, searchStr: '', currentPage: 1});
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

  handleSearch = ({ currentTarget: input }) => {
    const searchStr = input.value;
    this.setState({ searchStr: searchStr, selectedGenre: null, currentPage: 1 })
  }

  getPagedData = () => {

    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn, searchStr } = this.state;

    let filteredMovies =allMovies;
    if(searchStr){
      filteredMovies = allMovies.filter(m => _.startsWith(m.title.toLowerCase(), searchStr.toLowerCase() ));
    } else if (selectedGenre && selectedGenre._id){
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id) 
    }
      
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
          <Link 
            className="btn btn-primary" 
            to="/movies/new"
          >New Movie
          </Link> 
          <p> Showing {count} movies in the DB </p>
          <SearchBox 
            value={this.state.searchStr} 
            onChange={this.handleSearch} 
          />
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
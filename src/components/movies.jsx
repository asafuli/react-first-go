import React, { Component } from 'react';
import { getMovies, deleteMovie} from '../services/movieServices';
import { getGenres } from '../services/genreServices';
import { toast } from 'react-toastify';
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
  
  componentDidUpdate(prevProps, prevState) {

    console.log("CompDidUpd : ", prevProps, prevState , this.props, this.state);
  }

  async componentDidMount(){
    console.log("movies: compDidMount");
    const {data: genresFromDB} = await getGenres();
    console.log("movies: compDidMount - got back from getGenres with : ", genresFromDB);
    const {data: moviesFromDB} = await getMovies();
    console.log("movies: compDidMount - got back from getMovies with : ", moviesFromDB);
    const genres = [{_id: '', name: 'All Genres'}, ...genresFromDB]
    this.setState({genres, movies: moviesFromDB});
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const newMovies = originalMovies.filter(m => m._id !== movie._id);
    //const currentPage = Math.ceil(newMovies.length / this.state.pageSize);
    this.setState({movies: newMovies});
    try {
      await deleteMovie(movie._id);
    } catch(ex){
      if (ex.response && ex.response.status === 404){
        toast.error('This movie has already been deleted')
      } else if (ex.response && ex.response.status === 403){
        toast.info('You must be an admin to delete a movie')
      } else {
        toast.error('Unexpectd error occurred while trying to delete the movie...')
      }
      console.log(ex);
      this.setState({movies: originalMovies});
    }
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

  handleSearch = (searchQuery) => {
    this.setState({ searchStr: searchQuery, selectedGenre: null, currentPage: 1 })
  }

  getPagedData = () => {

    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn, searchStr } = this.state;
    let filteredMovies = allMovies;

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
    console.log("movies: render");
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } = this.state;
    const {totalCount: count, data: movies } = this.getPagedData();
    const { user } = this.props;

    return ( 
      (movies.length === 0) ? 
      <h3>Fetching data from server...</h3> :
      (<div className='row'>
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
          {user && (<Link 
            className="btn btn-primary" 
            to="/movies/new"
          >New Movie
          </Link>)}
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
      </div>)
    );
  }
}
 
export default Movies;
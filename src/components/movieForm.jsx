import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';
import { saveMovie, getMovie } from '../services/movieServices';
import { getGenres } from '../services/genreServices';

class MovieForm extends Form {
  state = {
    data: {title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).max(50).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  }

  async populateGenres(){
    const {data: genres} = await getGenres();
    this.setState({ genres });
  }

  async populateMovie(){
    try{
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const {data: movie} = await getMovie(movieId);
      //mapToViewModel is used to convert the "movie" from the DB/Server into "movie" view //object
      this.setState({ data: this.mapToViewModel(movie) });
    } catch(ex){
      if(ex.response && ex.response.status === 404){
        return this.props.history.replace("/not-found");
      }     
    }   
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  doSubmit = async () => {
    const newMovie = {...this.state.data};
    try {
      await saveMovie(newMovie);
    } catch(ex){
      console.log('reached savemovie error');
      console.log(ex);
      toast.error('Failed to save the movie to the DB');
    }
    this.props.history.push('/movies');
  }

  render() { 
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title','Title')}
          {this.renderSelectList('genreId','Genre', this.state.genres)}
          {this.renderInput('numberInStock','Number in Stock')}
          {this.renderInput('dailyRentalRate','Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;

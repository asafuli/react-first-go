import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class newMovieForm extends Form {
  state = {
    data: {title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
  }

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  }

  doSubmit = () => {
    const newMovie = {...this.state.data};
    newMovie._id = 0;
    newMovie.genre = getGenres().find(g => g._id === newMovie.genre);
    saveMovie(newMovie);
    console.log(newMovie);
    this.props.history.push('/movies');
  }

  render() { 
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title','Title')}
          {this.renderSelectList('genre','Genre',getGenres())}
          {this.renderInput('numberInStock','Number in Stock')}
          {this.renderInput('dailyRentalRate','Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
 
export default newMovieForm;

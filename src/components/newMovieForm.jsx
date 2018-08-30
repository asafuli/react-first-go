import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class newMovieForm extends Form {
  state = {
    data: {},
    errors: {},
  }

  render() { 
    return (
      <div>
        <h1>Movie Form</h1>
        <form></form>
      </div>
    );
  }
}
 
export default newMovieForm;

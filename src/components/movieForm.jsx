import React from 'react';
import NewMovieForm from './newMovieForm';

const MovieForm = ({match, history}) => {
  return (
    <div>
      <NewMovieForm/>
      <button className="btn btn-primary" onClick={() => history.push('/movies')}>Save</button>
    </div>
  );
}
 
export default MovieForm;
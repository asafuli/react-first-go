import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovieForm from './components/newMovieForm';
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/new" component={NewMovieForm}/>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect exact from="/" to="/movies"/>
            <Redirect to="/not-found" />
          </Switch>  
        </main>
      </React.Fragment>
    );
  }
}

export default App;

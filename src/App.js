import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Logout from './components/common/logout';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


class App extends Component {
  
state = {};

componentDidMount = () => {
  //wrapping in try-catch block in case we dont have any jwt in localSorage
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    this.setState({ user });
  } catch(ex) {}
}

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user}/>
        <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/logout" component={Logout}/>
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

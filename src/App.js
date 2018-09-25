import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import auth from './services/authService';
import Movies from './components/movies';
import NavBar from './components/common/navBar';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notfound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Logout from './components/common/logout';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  
state = {};

componentDidMount = () => {
  const user = auth.getCurrentUser();
  this.setState({ user });
}

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user}/>
        <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={user} />}/>
            <Route path="/customers" component={Customers}/>
            <ProtectedRoute path="/rentals" component={Rentals} />
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

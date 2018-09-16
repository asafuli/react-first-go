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
    console.log("render with user as : ", user);
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user}/>
        <main className='container'>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route 
              path="/movies/:id" 
              render={props => {
                if(!user){
                  return <Redirect to='/login' />
                }
                return <MovieForm {...props} />
              }}
             />
            <Route path="/movies" render={props => <Movies {...props} user={user} />}/>
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

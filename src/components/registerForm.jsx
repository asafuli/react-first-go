import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import auth from '../services/authService';
import * as userService from '../services/userService';


class RegisterForm extends Form {

  state = {
    data: {username: "", password: "",name: ""},
    errors: {}, 
  }
  
  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name'),
  }

  doSubmit = async () => {
    try{
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      
       /* commenting the below and instead calling window.location 
         to perform a full reload of the App after login in order
         to call 'componentDidMount again in App.js'  

      this.props.history.push('/');
      
      */
      window.location = '/';
     
    } catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }



  render() { 
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}
 
export default RegisterForm;

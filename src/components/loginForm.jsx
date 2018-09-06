import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
 
  /* React.createRef() creates reference which we can set to a DOM element using "ref" attribute  
    (in this case can be used to autofocus the username by addoing a lifecycle 
    method (i.e componentDidMount) and calling autofocus on the ref)
    NOTE: SHOULD TRY TO AVOID USING React.createRef
    
    username = React.createRef();

    componentDidMount() {
      this.username.current.focus();
    }
 }
  */
 state = {

  /*Note: For controlled elements - we have to initialize the state with some value 
   (null or undefined are considrered by React aas uncontrolloed elements)
  */
  data: {username: "", password: ""},
  errors: {},
}
  
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  }

  doSubmit = () => {
    //Call the server
    console.log("submitted");
  } 
  render() { 

    return (
      <div>
        <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
      </div>
    );
  }
}
 
export default LoginForm;
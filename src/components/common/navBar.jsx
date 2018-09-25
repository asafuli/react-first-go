import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">Vidly</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">Movies <span className="sr-only">(current)</span> </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">Customers <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
        </li> 
      </ul>
      <ul className="navbar-nav navbar-right">
        {!user && <React.Fragment>  
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li> 
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </li>
        </React.Fragment>}
        {user && <React.Fragment>  
          <li className="nav-item">
             <NavLink className="nav-link" to="/">{user.name}</NavLink>
          </li>        
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>
        </React.Fragment>}
      </ul>  
    </div>
  </nav>
    
  );
}
 
export default NavBar;
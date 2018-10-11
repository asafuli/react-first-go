import React, { Component } from 'react';

class RentButton extends Component {
  
  getBtnClass = () => {
   return this.props.isRented ?
   "btn btn-outline-info" :
   "btn btn-outline-success"}

  render() { 
    const {isRented, onPress} = this.props;
    return <button 
      className={this.getBtnClass()} 
      onClick={onPress}>{isRented ? "Return movie" : "Checkout"}</button>      
  }
}

export default RentButton;
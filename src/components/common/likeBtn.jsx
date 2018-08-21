import React, { Component } from 'react';

class LikeBtn extends Component {
  state = {
    //liked: false,
    //Commented the like cause it should be implemented as props (Like info will be recieved on each movie from the DB)
  }

  getIconClasses = () => this.props.liked ? 'fa fa-heart' : 'fa fa-heart-o'

  render() { 

    /*this.props.onPress is a different event that we are raising when an 'onClick' 
      event is raised due to pressing on the icon. we could call it also:
      this.props.onClick ,  it would still be a different event
    */ 
    return <i onClick={this.props.onPress} className={this.getIconClasses()} aria-hidden='true'></i>
  }
}
 
export default LikeBtn;
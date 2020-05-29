import React from 'react';
import './App.css';
import MobileLogin from './components/mobileLogin';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screenWidth: 400,
      loggedIn: false,
    }
  }

  handleLogin = () => {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  }

  render() {
    const { screenWidth, loggedIn } = this.state;
    
    if (screenWidth < 500 ) {
      return (
        <div>
          { loggedIn ? 
          <h1>Good you´re already logged in through your phone!</h1> :
          <MobileLogin handleLogin={this.handleLogin}/> }
        </div>
      )
    } else if (screenWidth > 500 && screenWidth < 900) {
      return (
        <h1>Hello Tablet user</h1>
      ) 
    } else {
      return (
        <h1>Hello Desktop User</h1>
      )
    }
  }
}

export default App;

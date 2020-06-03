import React from 'react';
import './App.css';
import MobileLogin from './components/mobileLogin';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screenWidth: 400,
      loggedIn: sessionStorage.getItem('userID') ? true : false,
      user: {

      }
    }
  }

  apiCall = `http://localhost:8000/users/${sessionStorage.getItem('userID')}`;

  getUser = async () => {
    if (this.state.loggedIn && sessionStorage.getItem('userID')) {
      const apiCall = await fetch(this.apiCall)
      const data = await apiCall.json()
      if (apiCall.status === 200) {
        this.setState({
          ...this.state,
          user: data
        })
      }
    }
  }

  checkLogin = () => {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  } 

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate() {
    this.getUser();
  }

  render() {
    const { screenWidth, loggedIn, user } = this.state;
    
    if (screenWidth < 500 ) {
      return (
        <div>
          { loggedIn ? 
          <div>
            <h1>Hello there! Is this you?</h1>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
          </div>
          
           : <div><h1>{this.state.testData}</h1>
          <MobileLogin checkLogin={this.checkLogin} /></div> }
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

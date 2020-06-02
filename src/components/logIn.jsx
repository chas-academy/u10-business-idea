import React from 'react';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            user: sessionStorage.getItem('userID')
        }
    }

    apiCall = 'http://localhost:8000/login';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async () => {
        const apiCall = await fetch(this.apiCall, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
        const data = await apiCall.json()
        if (apiCall.status === 200) {
            sessionStorage.setItem('userID', data)
        } else {
            sessionStorage.clear()
            sessionStorage.setItem('error', true)
            sessionStorage.setItem('errMessage', data.message)
        }
    }

    render() {
        const { email, password, user } = this.state;

            return (
                <div className="login">
                    <h2>Sign In</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" value={email} onChange={this.handleChange} name="email" id="email"/>
    
                        <label htmlFor="password">Password: </label>
                        <input type="text" value={password} onChange={this.handleChange} name="password" id="password" type="password"/>
    
                        <input type="submit" value="Sign In" className="landing-btn"/>
                    </form>
    
                    <p>No account yet? Register a new one <a href="https://www.fuckreact.com">here!</a></p>
                <div>{user}</div>
                </div>
            )
        
    }
}

export default LogIn;
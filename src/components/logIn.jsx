import React from 'react';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            user: ''
        }
    }

    apiCall = 'http://localhost:8000/login';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
            fetch(this.apiCall, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res => res.json())
                .then(data => console.log(data))

    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="login">
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">E-mail: </label>
                    <input type="text" value={email} onChange={this.handleChange} id="email"/>

                    <label htmlFor="password">Password: </label>
                    <input type="text" value={password} onChange={this.handleChange} id="password" type="password"/>

                    <input type="submit" value="Sign In" className="landing-btn"/>
                </form>

                <p>No account yet? Register a new one <a href="#">here!</a></p>
            </div>
        )
    }
}

export default LogIn;
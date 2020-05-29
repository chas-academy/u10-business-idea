import React from 'react';
import LogIn from './logIn';
import './mobileLogin.css';


class MobileLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAccount: true
        }
    }

    render() {

        const { hasAccount } = this.state;
        if (hasAccount) {
            return (
                <div>
                    <LogIn handleLogin={this.props.handleLogin} />
                </div>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    }
}

export default MobileLanding;
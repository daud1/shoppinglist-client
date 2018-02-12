import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';

class LogIn extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let url = baseURL + 'auth/login';
        let form = new FormData(event.target)

        axios.post(url, form)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            notify.show('Successfully Logged In!', 'success');
            this.props.history.push("/lists");
        })
        .catch(error => {
            notify.show('Oops!','error');
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' name = 'email' placeholder='Enter your email address'/>
                    <input type='password' name = 'password' placeholder='Enter your password'/>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        );
    }
}

export default LogIn;
import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
class ForgotPassword extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let url = baseURL + 'auth/forgot-password';
        let form = new FormData(event.target);

        axios.post(url, form)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log('ERR: ' + error );
        });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p> Enter your email address below to recieve a password reset link.</p>
                    <input type='email' name='email' placeholder='Enter your email address'/>
                    <button type='submit'>Send Reset Link</button>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;
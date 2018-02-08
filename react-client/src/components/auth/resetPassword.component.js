import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base';
class ResetPassword extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = baseURL + 'auth/reset-password'

        axios.post(url, form, {
            headers:    {'Authorization': localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="password" placeholder="Enter your new password here." />
                    <input type="password" placeholder="Type password again to confirm." />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        )
    }
}

export default ResetPassword;
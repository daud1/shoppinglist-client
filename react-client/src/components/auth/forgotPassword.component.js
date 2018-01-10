import React, { Component } from 'react';
var axios = require('axios');

class ForgotPassword extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        var url = 'http://localhost:5000/auth/forgot-password';
        var form = new FormData(event.target);

        axios.post(url, form)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
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
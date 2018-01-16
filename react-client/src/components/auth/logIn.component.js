import React, { Component } from 'react';
var axios = require('axios');

class LogIn extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        var url = 'http://localhost:5000/auth/login'
        var form = new FormData(event.target)

        axios.post(url, form)
        .then(response => {
            // console.log(response);
            localStorage.setItem('token', response.data.token)
            this.props.history.push("/lists");
            // console.log(response.data.token)
        })
        .catch(function(error){
            console.log('ERR : ' + error)
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
import React, { Component } from  'react';
var axios = require('axios');

class SignUp extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        var url = 'http://localhost:5000/auth/register';
        var form = new FormData(event.target);
        axios.post(url, form)
        .then(function(){console.log('User created')})
        .catch(function(error){console.log(error)});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' placeholder='Enter your email address' name='email' />
                    <input type='password' placeholder='Enter a password of your choice' name='password' />
                    <input type='password' placeholder='Re-enter your password' name='confirm'/>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
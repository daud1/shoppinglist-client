import React, { Component } from  'react';
import axios from 'axios';

class SignUp extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let url = 'http://localhost:5000/auth/register';
        let form = new FormData(event.target);
        
        axios.post(url, form)
        .then(response => {
            console.log(response);
            this.props.history.push('/login');
        })
        .catch(error => {
            console.log(error)
        });
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
                <p> Already have an account? Log In instead</p>
            </div>
        );
    }
}

export default SignUp;
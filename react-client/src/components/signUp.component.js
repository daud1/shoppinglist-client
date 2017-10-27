import React, { Component } from  'react';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirm: '',
            MSG: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        var formData = new FormData();
        var data = ['email', 'password', 'confirm'];
        var neo_this = this;

        for(var arb in data){
            formData.append(data[arb], this.state[data[arb]]);
        }

        fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                body: formData
        })
        .then((response => response.json()))
        .then(function(responseJSON){
            if (responseJSON['MSG']) {
                ;
            } else if (responseJSON['ERR']) {
                ;
            }
        })
        .catch(function(error){
            neo_this.setState({MSG: 'Oops! Looks like something went wrong!'})
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' placeholder='Enter your email address' name='email' value={this.setState.email} onChange={this.handleChange} />
                    <input type='password' placeholder='Enter a password of your choice' name='password' value={this.setState.password} onChange={this.handleChange} />
                    <input type='password' placeholder='Re-enter your password' name='confirm' value={this.setState.confirm} onChange={this.handleChange} />
                    <button type='submit' >Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
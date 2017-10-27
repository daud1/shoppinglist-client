import React, { Component } from 'react';

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            email: '',
            MSG: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        var formData = new FormData();
        var data = ['email', 'password']
        var neo_this = this;

        for(var arb in data)
            formData.append(data[arb], this.state[data[arb]]);
        
        fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                header: {
                    'Content-Type' : 'application/x-www-form-urlencoded' 
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
            neo_this.setState({MSG: 'Oops! Looks like something went wrong.'});
            console.log(neo_this.state.MSG);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='email' name = 'email' placeholder='Enter your email address' value={this.setState.email} onChange={this.handleChange}/>
                    <input type='password' name = 'password' placeholder='Enter your password' value={this.setState.password} onChange={this.handleChange} />
                    <button type='submit'>Log In</button>
                </form>
            </div>
        );
    }
}

export default LogIn;
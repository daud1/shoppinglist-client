import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,
    padding: '1%',
    height: 250,
    width: '80%',
    textAlign: 'center'
}
const divStyle = {
    paddingLeft: '35%',
    paddingRight: '35%'    
}

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
            <div style={divStyle}>
                <Paper style={paperStyle} zDepth={3}>
                    <h4> Enter your email address below to recieve a password reset link.</h4>
                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <div>
                            <TextField
                                type='email'
                                name = 'email'
                                floatingLabelText='Email Address'
                            />
                        </div>
                        <br />
                        <div>
                            <RaisedButton
                                type='submit'
                                label='Send Reset Link'
                                primary
                            />
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default ForgotPassword;
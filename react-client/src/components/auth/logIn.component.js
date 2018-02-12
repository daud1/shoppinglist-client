import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { notify } from 'react-notify-toast';

const paperStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,
    padding: '1%',
    height: 300,
    textAlign: 'center'
}
const divStyle = {
    paddingLeft: '25%',
    paddingRight: '25%'    
}
class LogIn extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let url = baseURL + 'auth/login';
        let form = new FormData(event.target);

        axios.post(url, form)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            notify.show('Successfully Logged In', 'success');
            this.props.history.push("/lists");
            
        })
        .catch(error => {
            notify.show('Oops! Something went wrong', 'error');
        });
    }

    render() {
        return (
            <div style={divStyle}>
                <Paper style={paperStyle} zDepth={3}>
                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <div>
                            <TextField
                                type='email'
                                name = 'email'
                                floatingLabelText='Enter your email address'
                            />
                        </div>
                        <div>
                            <TextField
                                type='password'
                                name = 'password'
                                floatingLabelText='Password' 
                            />
                        </div>
                        <br />
                        <br />
                        <div>
                            <RaisedButton
                                type='submit'
                                label='Log In'
                                primary
                            />
                        </div>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default LogIn;
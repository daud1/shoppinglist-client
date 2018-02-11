import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const style ={
    marginLeft: 500,
    marginRight: 500,
    marginTop: 200,
    padding: '1%',
    height: 300,
    textAlign: 'center'
}
class LogIn extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let url = baseURL + 'auth/login';
        let form = new FormData(event.target);

        axios.post(url, form)
        .then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.props.history.push("/lists");
            
        })
        .catch(error => {
            console.log('ERR : '+ error)
        });
    }

    render() {
        return (
            <div>
                <Paper style={style} zDepth={3}>
                    <form onSubmit={this.handleSubmit}>
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
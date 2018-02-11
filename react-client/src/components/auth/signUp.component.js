import React, { Component } from  'react';
import baseURL from '../generic/base';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const style = {
    marginLeft: 500,
    marginRight: 500,
    marginTop: 200,
    padding: '1%',
    
}


class SignUp extends Component {
    
    handleSubmit = (event) => {
        event.preventDefault();
        let url = baseURL + 'auth/register';
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
                <Paper style={style} zDepth={3}>
                    <form onSubmit={this.handleSubmit}>
                    
                        <div>
                            <TextField
                                name='email'
                                type='email'
                                floatingLabelText='Email'
                            />
                        </div>
                        <div>
                            <TextField
                                name='password'
                                type='password'
                                floatingLabelText='Password'
                            />
                        </div>
                        <div>
                            <TextField
                                name='confirm'
                                type='password'
                                floatingLabelText='Confirm Password'
                            />
                        </div>
                        <div>
                            <RaisedButton 
                                type='submit'
                                label='Sign Up'
                                primary
                            />
                        </div>

                    </form>
                    <p> Already have an account? <Link to={'/login'}>Log In</Link> instead</p>
                </Paper>
                
            </div>
        );
    }
}

export default SignUp;
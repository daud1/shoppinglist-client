import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { notify } from 'react-notify-toast';

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
    paddingLeft: '25%',
    paddingRight: '25%'    
}

class ResetPassword extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = baseURL + 'auth/reset-password'

        axios.post(url, form, {
            headers:    {'Authorization': localStorage.getItem('token')}
        })
        .then(response => {
            notify.show('Password Successfully Reset!', 'success');
            this.props.history.push('/login');
        })
        .catch(error => {
            if (error.response) {
                const { data, status } = error.response;
                if (status) {
                    notify.show(data.ERR, 'error');
                }
            }
            notify.show('Oops, looks like something went wrong!', 'error');
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
                            type='password'
                            name = 'new_password'
                            floatingLabelText="New Password"
                        />
                    </div>
                    <div>
                        <TextField
                            type='password'
                            name = 'confirm'
                            floatingLabelText="Confirm"
                        />
                    </div>
                    <br />
                    <div>
                        <RaisedButton
                            type='submit'
                            label='Reset Password'
                            primary
                        />
                        <br />
                    </div>
                    
                </form>
            </Paper>
        </div>
        )
    }
}

export default ResetPassword;
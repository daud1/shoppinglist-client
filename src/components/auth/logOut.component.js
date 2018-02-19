import React, { Component } from 'react';
import baseURL from '../generic/base'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { notify } from 'react-notify-toast';

export class LogOut extends Component {
    
    handleClick = (event) => {
        event.preventDefault();

        let url = baseURL + 'auth/logout'
        axios.post(url, {}, {
            headers: {'Authorization': localStorage.getItem('token')}
        })
        .then(response =>{
            localStorage.removeItem('token');
            this.props.history.push('/login');
        })
        .catch(error => {
            if(error.response) {
                const { status, data } = error.response;
                if(status)
                    notify.show(data.ERR, 'error');
            }
            notify.show('Oops! Connection Error!', 'error');
        });
    }
    render() {
        return (
            <button onClick={this.handleClick} className="btn btn-success" >
                LogOut
            </button>
        )
    }
}

const LogOutwithRouter = withRouter(LogOut);
export default LogOutwithRouter;
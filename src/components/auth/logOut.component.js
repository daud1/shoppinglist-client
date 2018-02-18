import React, { Component } from 'react';
import baseURL from '../generic/base'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LogOut extends Component {
    
    handleClick = (event) => {
        event.preventDefault();

        let url = baseURL + 'auth/logout'
        axios.post(url, {}, {
            headers: {'Authorization': localStorage.getItem('token')}
        })
        .then(response =>{
<<<<<<< HEAD:src/components/auth/logOut.component.js
            localStorage.removeItem('token');
            this.props.history.push('/login');
=======
            console.log(response);
>>>>>>> f8d37afac3b5e763391b618193ddb8fa8f8cbe8e:react-client/src/components/auth/logOut.component.js
        })
        .catch(error => {
            console.log(error);
        })
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
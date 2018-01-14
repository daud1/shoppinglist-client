import React, { Component } from 'react';
import axios from 'axios';

class LogOut extends Component {
    
    handleClick = (event) => {
        event.preventDefault();

        let url = 'http://localhost:5000/auth/logout'
        axios.post(url)
        .then(response =>{
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        return (
            <button onClick={this.handleClick}>LogOut</button>
        )
    }
}
export default LogOut;
import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base';

class CreateList extends Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit = event => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = baseURL +  'shoppinglists/';

        axios.post(url, form, {
            headers: {'Authorization': localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
            this.myFormRef.reset();
            this.props.callback();
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}>
                    <input type='text' placeholder='Enter the name of your new list here' name='name' />
                    <button type='submit'>CreateList</button>
                </form>
            </div>
        )
    }
}

export default CreateList;
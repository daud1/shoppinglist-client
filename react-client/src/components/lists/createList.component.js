import React, { Component } from 'react';
import axios from 'axios';

class CreateList extends Component {
    constructor() {
        super();
        this.state = {}
    }

    handleSubmit = event => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = 'http://localhost:5000/shoppinglists/'

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
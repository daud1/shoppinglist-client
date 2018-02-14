import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';

class CreateItem extends Component {
    constructor () {
        super();
        this.state = {}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData(event.target);
        let url = baseURL + 'shoppinglists/' + this.props.list_id + '/items/';

        axios.post(url, form, {
            headers: {'Authorization': localStorage.getItem('token')}
        })
        .then(response => {
            console.log(response);
            this.myFormRef.reset();
            notify.show('Item added!', 'success');
            this.props.callback();
        })
        .catch(error => {
            notify.show('Oops!', 'error');
            console.log(error);
        })
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}>
                    <input type='text' name='name' placeholder='Enter name here' />
                    <button type='submit'>Create Item</button>
                </form>
            </div>
        )
    }
}
export default CreateItem;
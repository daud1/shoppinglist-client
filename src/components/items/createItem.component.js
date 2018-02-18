import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import TextField from 'material-ui/TextField';

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
            this.myFormRef.reset();
            notify.show('Item added!', 'success');
            this.props.callback();
        })
        .catch(error => {
            if (error.response) {
                const { data, status } = error.response;
                if(status) {
                    notify.show(data.ERR, 'error');
                }
            }
            notify.show('Oops! Something went wrong. Try again!', 'error');
        });
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}>
                    <TextField
                        type='text'
                        name = 'name'
                        floatingLabelText='Enter item name'
                    />
                    <button type='submit' className="btn btn-primary">Add Item</button>
                </form>
            </div>
        )
    }
}
export default CreateItem;
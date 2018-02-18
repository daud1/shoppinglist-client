import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';
import { notify } from 'react-notify-toast';

class DelButton extends Component {
    
    handleClick = (props) => {
        let url = baseURL + 'shoppinglists/';
        // if props is not null, generate appropriate url for list or item deletion
        if (this.props) {
            if (this.props.item_id && this.props.list_id){
                url = url + this.props.list_id + '/items/' + this.props.item_id;
                
            } else if (this.props.list_id && !this.props.item_id) {
                url = url + this.props.list_id;
            }
            // make a call to the api to delete the selected item/list
            axios.delete(url, {
                headers: {'Authorization': localStorage.getItem('token')}
            }).then(response => {
                this.props.callback();
                notify.show('Item deleted.', 'success');
            }).catch(error => {
                this.props.callback();
                if(error.response){
                    const { data, status} = error.response;
                    if (status)
                        notify.show(data.ERR, 'error');
                    }
                notify.show('Oops! Something went wrong.', 'error');
            });
        } else {
            notify.show('Oops. Something went wrong!', 'error');
        }
    }

    render() {
        return (
            <button type="button" className="btn btn-danger" onClick={this.handleClick}>
                Delete
            </button>
        )
    }
}
export default DelButton;

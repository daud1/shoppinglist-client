import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';

class DelButton extends Component {
    
    handleClick = (props) => {
        let url = baseURL + 'shoppinglists/';
        // if props is not null, generate appropriate url for list or item deletion
        if (this.props) {

            console.log(!this.props.item_id)
            if (this.props.item_id && this.props.list_id){
                url = baseURL + this.props.list_id + '/items/' + this.props.item_id;
                
            } else if (this.props.list_id && !this.props.item_id) {
                url = baseURL + this.props.list_id;
            }
            // make a call to the api to delete the selected item/list
            axios.delete(url, {
                headers: {'Authorization': localStorage.getItem('token')}
            }).then(response => {
                // this.props.callback();
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log('Something went wrong! Check your internet connection');
        } 
    }

    render() {
        return (
            <button onClick={this.handleClick}>Delete</button>
        )
    }
}

export default DelButton;
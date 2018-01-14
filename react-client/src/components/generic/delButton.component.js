import React, { Component } from 'react';
import axios from 'axios';

class DelButton extends Component {
    
    handleClick = (props) => {
        let url = 'http://localhost:5000/shoppinglists/';
        // if props is not null, generate appropriate url for list or item deletion
        if (this.props) {
            if (this.props.item_id && this.props.list_id)
                url = url + this.props.list_id + '/items/' + this.props.item_id;
            else if (this.props.list_id && !this.props.item_id)
                url = url + this.props.list_id;

            // make a call to the api to delete the selected item/list
            axios.delete(url, {
            headers: {'Authorization': localStorage.getItem('token')}
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log('Something went wrong!');
        } 
    }

    render() {
        return (
            <button onClick={this.handleClick} >Delete Item</button>
        )
    }
}

export default DelButton;
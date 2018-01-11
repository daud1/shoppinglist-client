import React, { Component } from 'react';
import axios from 'axios';

class ItemDelButton extends Component {
    
    handleClick = (props) => {
        let url = 'http://localhost:5000/shoppinglists/';
        
        if (this.props) {
            if (this.props.item_id && this.props.list_id)
            // if props is not null, generate url by appending the list and item id
                url = url + this.props.list_id + '/' + this.props.item_id
            
            // make a call to the api to delete the selected item
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
            <button onClick={this.handleClick} ></button>
        )
    }
}

export default ItemDelButton;
import React, { Component } from 'react';
import baseURL from  '../generic/base';
import axios from 'axios';
import DeleteIcon from 'material-ui-icons/Delete'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { notify } from 'react-notify-toast';

class DelButton extends Component {
    
    handleClick = (props) => {
        let url = baseURL + 'shoppinglists/';
        // if props is not null, generate appropriate url for list or item deletion
        if (this.props) {

            console.log(!this.props.item_id)
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
                console.log(error);
                if(error.response){
                    const { data, status} = error.response;
                    if(status === 404){
                        this.props.callback();
                    }
                }
                notify.show('Oops!', 'error');
            });
        } else {
            console.log('Something went wrong! Check your internet connection');
        } 
    }

    render() {
        return (
            <FloatingActionButton>
                <DeleteIcon 
                    onClick={this.handleClick}
                />                
            </FloatingActionButton>
        )
    }
}

export default DelButton;
import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';
import DeleteIcon from 'material-ui-icons/Delete'
import FloatingActionButton from 'material-ui/FloatingActionButton'

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
                this.props.callback();
                // window.location.reload();
            }).catch(error => {
                console.log(error);
                if(error.response){
                    const { data, status} = error.response;
                    if(status === 404){
                        this.props.callback();
                    }
                }
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
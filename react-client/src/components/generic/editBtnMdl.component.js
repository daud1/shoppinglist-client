import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';

class EditBtnMdl extends Component {
   
    handleSubmit = (event) => {
        event.preventDefault();
        
        let url = baseURL + 'shoppinglists/';
        let form = new FormData(event.target);

        if(this.props) {
            if (this.props.item_id && this.props.list_id){
                url = url + this.props.list_id + '/items/' + this.props.item_id;
            } else if (this.props.list_id && !this.props.item_id) {
                url = url + this.props.list_id;
            }
            axios.put(url, form, {
                headers: {'Authorization': localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);
                this.myFormRef.reset();
                notify.show('Item name edited!', 'success');
                this.props.callback();
            })
            .catch(error => {
                console.log(error);
                notify.show('Oops', 'error');
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}>
                    <input type='text' placeholder='Enter new name' name='name' />
                    <button type='submit'>Edit</button>
                </form>
            </div>
        )
    }
}
export default EditBtnMdl;
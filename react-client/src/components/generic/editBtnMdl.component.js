import React, { Component } from 'react';
import axios from 'axios';

class EditBtnMdl extends Component {
   
    handleSubmit = (event) => {
        event.preventDefault();
        var url = 'http://localhost:5000/shoppinglists/';
        var form = new FormData(event.target);

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
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Enter new item name' name='item_name' />
                    <button type='submit'>Edit</button>
                </form>
            </div>
        )
    }
}
export default EditBtnMdl;
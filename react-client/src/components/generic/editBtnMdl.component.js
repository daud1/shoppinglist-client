import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import TextField from 'material-ui/TextField';

const formStyle = {
    marginLeft: '20%'
}
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
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editModal">
                     Edit
                </button>
                <div className="modal fade" id="editModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Edit List</h3>
                        </div>
                        <div className="modal-body">
                            <form style={formStyle} onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}>
                                <TextField
                                    type='text'
                                    name = 'name'
                                    floatingLabelText='Enter item name'
                                />
                                <button type='submit' className="btn btn-success">
                                    Edit
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default EditBtnMdl;
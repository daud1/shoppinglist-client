import React, { Component } from 'react';
import baseURL from '../generic/base';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

const formStyle = {
    marginLeft: '30%'
}

class EditBtnMdl extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

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

    handleOpen = () => {
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    render() {
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
          ];
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleOpen}>Edit</button>
                <Dialog  title="Edit Name" actions={actions} modal={true}
                    open={this.state.open}>
                    <form style={formStyle} onSubmit={this.handleSubmit} ref={(fm) => this.myFormRef = fm}> 
                        <TextField
                            type='text'
                            name = 'name'
                            floatingLabelText='Enter item name'
                            autoFocus={true}
                        />
                        <button type='submit' className="btn btn-success">Edit</button>
                    </form>
                </Dialog>
            </div>
            );
    }
}
export default EditBtnMdl;
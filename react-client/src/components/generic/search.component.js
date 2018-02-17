import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { notify } from 'react-notify-toast';

class Search extends Component {
    constructor() {
        super();
        this.state = {}
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let url = baseURL;
        if (this.state.q) {
            if (this.props.listId)
                url = url  + 'shoppinglists/' + this.props.listId + '?q=' + this.state.q;
            else 
                url = url  + 'shoppinglists/?q=' + this.state.q;

            axios.get(url, {
                headers: {'Authorization': localStorage.getItem('token')}
            })
            .then(response => {
                if (response.data.lists)
                    this.props.setValue(response.data.lists, response.data.number_of_pages);
                else
                    this.props.setValue(response.data.items, response.data.number_of_pages);
            })
            .catch(error => {
                if(error.response){
                    const { data, status} = error.response;
                    if(status === 404){
                        this.props.callback();
                        notify.show('No lists by that name!', 'error');
                    } else {
                        notify.show(data.ERR, 'error');
                    }
                }
            });
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    } 

    render() {    
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        type='text'
                        floatingLabelText='Search'
                        name='q'
                        onChange={this.handleChange}
                    />
                    <RaisedButton
                        type='submit'
                        label='Search'
                    />
                </form>
            </div>
        )
    }
}

export default Search;
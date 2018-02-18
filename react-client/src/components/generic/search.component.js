import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';
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
            <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
                <div className="form-group">
                    <input type='text' name='q' placeholder='Search' onChange={this.handleChange} />
                </div>
                <button type='submit' className='btn btn-default'>
                    <i className="glyphicon glyphicon-search"></i>    
                </button>
            </form>
        )
    }
}

export default Search;
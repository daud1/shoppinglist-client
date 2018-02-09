import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './base';

class Search extends Component {

    
    handleSubmit = (event) => {
        event.preventDefault()
        let url = baseURL  + 'shoppinglists/?q=' + this.state.q;
        axios.get(url, {
            headers: {'Authorization': localStorage.getItem('token')}
        })
        .then(response => {
            this.props.setValue(response.data.lists, response.data.number_of_pages);
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error' + error);
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    } 

    render() {    
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search' name='q' onChange={this.handleChange}/>
                    <button type='submit'>Search</button>
                </form>
            </div>
        )
    }
}

export default Search;
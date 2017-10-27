import React, { Component } from 'react';

class ShoppingLists extends Component {
    constructor() {
        super();
        this.state={
            list_name:  '',
            list:       [], //fetch list of shopping lists for current user, GET, 
            MSG:        ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        var formData = new FormData();
        var data = ['list_name'];
        var neo_this = this;

        for(var arb in data){
            formData.append(data[arb], this.state[data[arb]]);
        }

        fetch('http://localhost:5000/shoppinglists', {
                method:     'POST',
                headers:    {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:       formData
        })
        .then((response => response.json()))
        .then(function(responseJSON){
            if (responseJSON['MSG']) {
                ;
            } else if (responseJSON['ERR']) {
                ;
            }
        })
        .catch(function(error){
            neo_this.setState({MSG: 'Oops, Look like something went wrong!'});
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='list_name' placeholder='Enter the name of your new list' value={this.setState.list_name} onChange={this.handleChange} />
                    <button type='submit'>Create List</button>
                </form>
                <ul>
                    {
                        this.state.list.map(function(listValue){
                            return <li><a>{listValue}</a></li>;//make links redirect to respective lists on the fly.
                        })
                    }
                </ul>
            </div>            
        );
    }
}

export default ShoppingLists;
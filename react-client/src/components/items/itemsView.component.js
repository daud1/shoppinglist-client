import React, { Component } from 'react';
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';
import CreateItem from './createItem.component';
import axios from 'axios';
import baseURL from '../generic/base';

class ItemsView extends Component{
    constructor() {
        super();
        this.state = {}
    }

    fetchItems = () => {
        let url = baseURL + 'shoppinglists/' + this.props.match.params.list_id;
        axios.get(url, {
            headers: {'Authorization': localStorage.getItem('token')}
            })
        .then(response => {
            console.log(response); 
            this.setState({listItems: response.data});
        })
        .catch(error => {
            console.log('ERR: ' + error);
        });
    }
    componentWillMount(){
       this.fetchItems();
    }

    render(){
        return (
            <div>
                <LogOut />
                <CreateItem list_id={this.props.match.params.list_id} callback={this.fetchItems}/>
                <Lister list={this.state.listItems} callback={this.fetchItems}/>
            </div>
        )
    }
}


export default ItemsView;
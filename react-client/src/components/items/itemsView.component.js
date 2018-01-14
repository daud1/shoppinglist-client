import React, { Component } from 'react';
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';
import axios from 'axios';

class ItemsView extends Component{
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount(){
       let item_id = 5; 
       let url = 'http://localhost:5000/shoppinglists/' + item_id;
       axios.get(url, {
           headers: {'Authorization': localStorage.getItem('token')}
        })
       .then((response) => {
           console.log(response); 
           this.setState({listItems:response.data});
       })
       .catch((error) => {
           console.log(error);
       });
    }

    render(){
        return (
            <div>
                <LogOut />
                <Lister list={this.state.listItems} />
            </div>
        )
    }
}


export default ItemsView;
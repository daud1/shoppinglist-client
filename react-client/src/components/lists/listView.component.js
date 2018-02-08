import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base'
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';
import CreateList from './createList.component';

class ListView extends Component {
    constructor() {
        super();
        this.state = {};
    }
    
    fetchList = () => {
        let url = baseURL + 'shoppinglists/';
        axios.get(url, {
            headers: {'Authorization': localStorage.getItem('token')}
         })
        .then((response) => {
            console.log(response); 
            this.setState({list:response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentWillMount(){
        this.fetchList();
    }

    render() {
        return (
            <div>
                <LogOut />
                <CreateList callback={this.fetchList}/>
                <p> See all your lists here: </p>
                <Lister list={this.state.list} callback={this.fetchList} />
            </div>
        )
    }
}

export default ListView;
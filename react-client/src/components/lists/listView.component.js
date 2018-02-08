import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base'
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';
import CreateList from './createList.component';
import Search from '../generic/search.component';

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
            this.setState({
                list:response.data.lists,
                numberOfPages: response.data.number_of_pages
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentWillMount(){
        this.fetchList();
    }

    setLists = (arr, numberOfPages) => {
        this.setState({list:arr, numberOfPages:numberOfPages});
    }

    render() {
        return (
            <div>
                <Search setValue={this.setLists} />
                <LogOut />
                <CreateList callback={this.fetchList}/>
                <p> See all your lists here: </p>
                <Lister list={this.state.list} callback={this.fetchList} />
                <ReactPaginate 
                    pageCount = {this.state.numberOfPages}
                    pageRangeDisplayed = {5} 
                    marginPagesDisplayed = {2}
                />
            </div>
        )
    }
}

export default ListView;
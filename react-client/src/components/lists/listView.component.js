import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base'
import Lister from '../generic/list.component';
import LogOutwithRouter from '../auth/logOut.component';
import CreateList from './createList.component';
import Search from '../generic/search.component';

class ListView extends Component {
    constructor() {
        super();
        this.state = {};
    }
    
    fetchList = (page=1) => {
        let url = baseURL + 'shoppinglists/?page=' + page;
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

    getPage = (event) => {
        event.preventDefault();
        this.fetchList(event.target.getAttribute("data-page"))
    }

    render() {

        let pagss = []
        for(let i=1; i <= this.state.numberOfPages; i++){
            pagss.push(
                <li>
                    <a href="" data-page={i} onClick={this.getPage}>{i}</a>
                </li>
            )
        }
        return (
            <div>
                <Search setValue={this.setLists} />
                <LogOut />
                <CreateList callback={this.fetchList}/>
                <p> See all your lists here: </p>
                <Lister list={this.state.list} callback={this.fetchList} />
                { pagss }
            </div>
        )
    }
}

export default ListView;
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
    
    fetchLists = (page=1) => {
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
            if(error.response){
                const {status, data} = error.response;
                if(status === 404){
                    this.setState({'list': false});
                }
            }
            console.log(error);
        });
    }

    componentWillMount(){
        this.fetchLists();
    }

    setLists = (arr, numberOfPages) => {
        this.setState({list:arr, numberOfPages:numberOfPages});
    }

    getPage = (event) => {
        event.preventDefault();
        this.fetchLists(event.target.getAttribute("data-page"))
    }

    render() {

        let pageNumbers = []
        for(let i=1; i <= this.state.numberOfPages; i++){
            pageNumbers.push(
                <li key={i}>
                    <a href="" data-page={i} onClick={this.getPage}>{i}</a>
                </li>
            )
        }
        return (
            <div>
                <Search setValue={this.setLists} />
                <LogOutwithRouter />
                <CreateList callback={this.fetchList}/>
                <p> See all your lists here: </p>
                <Lister list={this.state.list} callback={this.fetchLists} />
                { pageNumbers }
            </div>
        )
    }
}

export default ListView;
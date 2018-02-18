import React, { Component } from 'react';
import axios from 'axios';
import baseURL from '../generic/base'
import Lister from '../generic/list.component';
import LogOutwithRouter from '../auth/logOut.component';
import CreateList from './createList.component';
import Search from '../generic/search.component';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';


class ListView extends Component {
    constructor() {
        super();
        this.state = {
            pageNumbers: []
        };
    }
    
    fetchLists = (page=1) => {
        let url = baseURL + 'shoppinglists/?page=' + page;
        axios.get(url, {
            headers: {'Authorization': localStorage.getItem('token')}
         })
        .then((response) => {
            this.setState({
                list:response.data.lists,
                numberOfPages: response.data.number_of_pages
            });
        })
        .catch((error) => {
            if(error.response){
                const {status, data} = error.response;
                if(status === 404)
                    this.setState({'list': false});
                else {
                    if(data.ERR)
                        notify.show(data.ERR, 'error');
                }
            }
            notify.show('Oops, something went wrong. Try again!', 'error');
        });
    }

    componentWillMount(){
        if(!localStorage.getItem('token'))
            this.props.history.push('/login');
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

        for(let i=1; i <= this.state.numberOfPages; i++){
            this.state.pageNumbers.push(
                <li className="page-item" key={i}>
                    <a href="" className="page-link" data-page={i} onClick={this.getPage}>{i}</a>
                </li>
            )
        }
        return (
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link className="navbar-brand" to={'/lists'}>Shopping Lists</Link>
                        </div>

                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <Search setValue={this.setLists} callback={this.fetchLists} />
                        </ul>
                            
                        <ul class="nav navbar-nav navbar-right">
                            <br />
                            <LogOutwithRouter />
                        </ul>
                        </div>
                    </div>
                </nav>
                <CreateList callback={this.fetchLists}/>
                <h3> See all your lists here: </h3>
                <Lister list={this.state.list} callback={this.fetchLists} />
                <nav>
                    <ul className="pagination">
                        { this.state.pageNumbers }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ListView;
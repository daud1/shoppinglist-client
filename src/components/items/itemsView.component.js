import React, { Component } from 'react';
import Lister from '../generic/list.component';
import LogOutwithRouter from '../auth/logOut.component';
import CreateItem from './createItem.component';
import axios from 'axios';
import baseURL from '../generic/base';
import Search from '../generic/search.component';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';

class ItemsView extends Component{
    constructor() {
        super();
        this.state = {}
    }

    fetchItems = (page=1) => {
        let url = baseURL + 'shoppinglists/' + this.props.match.params.list_id + '?page=' + page;
        this.setState({'listId': this.props.match.params.list_id});

        axios.get(url, {
            headers: {'Authorization': localStorage.getItem('token')}
            })
        .then(response => {
            this.setState({
                listItems:response.data.items,
                numberOfPages:response.data.number_of_pages
            });
        })
        .catch(error => {
            if (error.response){
                const { data, status } = error.response
                if(status === 404)
                    this.setState({'listItems': false});
                else if (status === 401)
                    notify.show('Please LogIn!', 'error')
                else if (data.ERR)
                    notify.show(data.ERR, 'error');
            }
        });
    }

    componentWillMount(){
        if(!localStorage.getItem('token'))
            this.props.history.push('/login');
       this.fetchItems();
    }

    setListItems = (arr, numberOfPages) => {
        this.setState({listItems:arr, numberOfPages:numberOfPages});
    }

    getPage = (event) => {
        event.preventDefault();
        this.fetchItems(event.target.getAttribute("data-page"))
    }

    render(){

        let pageNumbers = []
        for(let i=1; i <= this.state.numberOfPages; i++){
            pageNumbers.push(
                <li className="page-item" key={i}>
                    <a href='' data-page={i} className="page-link" onClick={this.getPage}>{i}</a>
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
                            <Search setValue={this.setLists} callback={this.fetchItems} listId={this.state.listId} />
                        </ul>
                            
                        <ul class="nav navbar-nav navbar-right">
                            <br />
                            <LogOutwithRouter />
                        </ul>
                        </div>
                    </div>
                </nav>
                <CreateItem list_id={this.props.match.params.list_id} callback={this.fetchItems}/>
                <Lister list={this.state.listItems} callback={this.fetchItems}/>
                <nav>
                    <ul className="pagination">
                        { pageNumbers }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ItemsView;
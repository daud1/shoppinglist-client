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
        this.state = {
            pageNumbers: []
        }
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

        for(let i=1; i <= this.state.numberOfPages; i++){
            this.state.pageNumbers[i-1] = 
                    <li className="page-item" key={i}>
                        <a href="" className="page-link" data-page={i} onClick={this.getPage}>{i}</a>
                    </li>
        }
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to={'/lists'}>Items</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <Search setValue={this.setListItems} callback={this.fetchItems} listId={this.state.listId} />
                        </ul>
                            
                        <ul className="nav navbar-nav navbar-right">
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
                        { this.state.pageNumbers }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default ItemsView;
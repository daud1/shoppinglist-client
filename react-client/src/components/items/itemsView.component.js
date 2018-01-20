import React, { Component } from 'react';
import Lister from '../generic/list.component';
import LogOutwithRouter from '../auth/logOut.component';
import CreateItem from './createItem.component';
import axios from 'axios';
import baseURL from '../generic/base';
import Search from '../generic/search.component';

class ItemsView extends Component{
    constructor() {
        super();
        this.state = {}
    }

    fetchItems = (page=1) => {
        let url = baseURL + 'shoppinglists/' + this.props.match.params.list_id + '?page=' + page;
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
            console.log(error);
        });
    }

    componentWillMount(){
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

        let pagss = []
        for(let i=1; i <= this.state.numberOfPages; i++){
            pagss.push(
                <li>
                    <a href='' data-page={i} onClick={this.getPage}>{i}</a>
                </li>
            )
        }
        return (
            <div>
                <Search setValue={this.setListItems} />
                <LogOut />
                <CreateItem list_id={this.props.match.params.list_id} callback={this.fetchItems}/>
                <Lister list={this.state.listItems} callback={this.fetchItems}/>
                { pagss }
            </div>
        )
    }
}

export default ItemsView;
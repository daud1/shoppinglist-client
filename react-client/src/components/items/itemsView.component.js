import React, { Component } from 'react';
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';
import CreateItem from './createItem.component';
import axios from 'axios';
import baseURL from '../generic/base';
import Search from '../generic/search.component';
import ReactPaginate from 'react-paginate';
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
            this.setState({
                listItems:response.data.items,
                numberOfPages:response.data.number_of_pages
            });
        })
        .catch(error => {
            console.log('ERR: ' + error);
        });
    }
    componentWillMount(){
       this.fetchItems();
    }

    setListItems = (arr, numberOfPages) => {
        this.setState({listItems:arr, numberOfPages:numberOfPages});
    }

    render(){
        return (
            <div>
                <Search setValue={this.setListItems} />
                <LogOut />
                <CreateItem list_id={this.props.match.params.list_id} callback={this.fetchItems}/>
                <Lister list={this.state.listItems} callback={this.fetchItems}/>
                <ReactPaginate 
                    pageCount = {this.state.numberOfPages}
                    pageRangeDisplayed = {5} 
                    marginPagesDisplayed = {2}
                />
            </div>
        )
    }
}


export default ItemsView;
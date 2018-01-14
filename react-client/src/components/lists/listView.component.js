import React, { Component } from 'react';
import axios from 'axios';
import Lister from '../generic/list.component';
import LogOut from '../auth/logOut.component';

class ListView extends Component {
    constructor() {
        super();
        this.state = {};
        
        // let url = 'http://localhost:5000/shoppinglists/'
        // axios.get(url, {
        //     headers: {'Authorization': localStorage.getItem('token')}
        // })
        // .then(response => {
        //     console.log(response)
        //     this.setState({list: response.data});
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }
    
    componentWillMount(){
        let url = 'http://localhost:5000/shoppinglists/';
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

    render() {
        return (
            <div>
                <LogOut />
                <p> See all your lists here: </p>
                <Lister list={this.state.list} />
            </div>
        )
    }
}

export default ListView;
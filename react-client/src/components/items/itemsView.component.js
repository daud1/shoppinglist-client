import React, { Component } from 'react';
import List from '../generic/list.component';
var axios = require('axios');

class ListView extends Component{
    constructor() {
        super();
        this.state = {
            listItems: []
        };
    }

    componentWillMount(){
       var item_id = 5; 
       var url = 'http://localhost:5000/shoppinglists/' + item_id;
       axios.get(url, {
           headers: {'Authorization': 'Basic' + localStorage.getItem('token')}
       })
       .then((response) => {
           console.log(response); 
        //    var test = [response.data[0].item_name, response.data[1].item_name]
           this.setState({listItems:response.data});
        //    console.log(this.state);
       })
       .catch((error) => {
           console.log(error);
       });
    }

    render(){
        return (
            <div>
                <List list={this.state.listItems} />
            </div>
        )
    }
}


export default ListView;
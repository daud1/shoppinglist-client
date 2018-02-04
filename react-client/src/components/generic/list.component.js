import React, { Component } from 'react';
import DelButton from './delButton.component';
import EditBtnMdl from './editBtnMdl.component';
import { Link } from 'react-router-dom';

class Lister extends Component{

    render() {
        return (
            <div>
                <ul>
                    {
                        (this.props.list) 
                        ? this.props.list.map(listValue => {
                            //formatting depending on whether the listValue holds an Item or List object
                            if (listValue.list_id && listValue.item_id) {
                                return (
                                    <div>
                                        <li key={listValue.item_id}>
                                        {console.log(listValue.item_id)}
                                            {listValue.name} 
                                            <DelButton 
                                                list_id={listValue.list_id}
                                                item_id={listValue.item_id}
                                                callback={this.props.callback}/> 
                                            <EditBtnMdl 
                                                list_id={listValue.list_id}
                                                item_id={listValue.item_id}
                                                callback={this.props.callback}/>
                                        </li>                                    
                                    </div>
                                )
                            //include link to the itemsView if the listValue object holds a List object
                            } else if (listValue.list_id && !listValue.item_id) {
                                return (
                                    <div>
                                        <li key={listValue.list_id}>
                                        {console.log(listValue.list_id)}
                                            <Link to={`/items/${listValue.list_id}`}>{listValue.name} </Link>
                                            <DelButton 
                                                list_id={listValue.list_id}
                                                callback={this.props.callback}/> 
                                            <EditBtnMdl 
                                                list_id={listValue.list_id}
                                                callback={this.props.callback}/>
                                        </li>                                    
                                    </div>
                                )
                            }
                        })
                        : "Oops! Nothing Found!"

                    }
                </ul>
            </div>
        );
    }
}

export default Lister;
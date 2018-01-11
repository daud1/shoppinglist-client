import React, { Component } from 'react';
import ItemDelButton from './delButton.component';

class Lister extends Component{

    render() {
        return (
            <div>
                <ul>
                    {
                        (this.props.list) 
                        ? this.props.list.map(listValue => {
                            return (
                                <div>
                                    <li>{listValue.item_name}</li>
                                    <ItemDelButton 
                                         item_id={listValue.item_id} 
                                         list_id={listValue.list_id} 
                                    />
                                </div>
                            )
                            }) 
                        : "Nothing Found!"

                    }
                </ul>
            </div>
        );
    }
}

export default Lister;
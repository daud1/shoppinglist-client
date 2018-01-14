import React, { Component } from 'react';
import DelButton from './delButton.component';
import EditBtnMdl from './editBtnMdl.component';

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
                                    <DelButton 
                                         list_id={listValue.list_id} 
                                         item_id={listValue.item_id} 
                                    />
                                    <EditBtnMdl 
                                         list_id={listValue.list_id}
                                         item_id={listValue.item_id}
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
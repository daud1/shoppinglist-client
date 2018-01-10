import React, { Component } from 'react';

class List extends Component{

    render() {
        return (
            <div>
                <ul>
                    {
                        (this.props.list) ? this.props.list.map((listValue  ) => {
                            return <li>{listValue.item_name}</li>;
                        }) : 'not found'

                    }
                </ul>
            </div>
        );
    }
}

export default List;
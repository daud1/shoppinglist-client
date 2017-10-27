import React, { Component } from 'react';

class ListItems extends Component{
    constructor() {
        super();
        this.state={
            list: []
        }
    }

    // handleChange(event) {}

    // handleSubmit(e) {}

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map(function(listValue) {
                            return <li>{listValue}</li>;
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ListItems;
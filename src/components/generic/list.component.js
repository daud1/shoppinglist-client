import React, { Component } from 'react';
import DelButton from './delButton.component';
import EditBtnMdl from './editBtnMdl.component';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const cardStyle = {
    padding: '1%',
    margin: '2%',
    marginLeft: '20%',
    marginRight: '20%',
    textAlign: 'center'    
}
class Lister extends Component{

    render() {
        return (
            <div>
                <Card style={cardStyle} zDepth={2}>
                    <Table>
                        <TableBody>
                        {
                            (this.props.list) 
                            ? this.props.list.map((listValue, index) => {
                                // formatting depending on whether the listValue holds an Item or List object
                                if (listValue.list_id && listValue.item_id) {
                                    return (
                                            <TableRow key={index}>
                                                <TableRowColumn>
                                                    {listValue.name}
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <DelButton 
                                                        list_id={listValue.list_id}
                                                        item_id={listValue.item_id}
                                                        callback={this.props.callback}
                                                    />
                                                </TableRowColumn>
                                                <TableRowColumn>
                                                    <EditBtnMdl 
                                                        list_id={listValue.list_id}
                                                        item_id={listValue.item_id}
                                                        name={listValue.name}
                                                        callback={this.props.callback}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>                                 
                                    )
                                //include link to the itemsView if the listValue object holds a List object
                                } else if (listValue.list_id && !listValue.item_id) {
                                    return (
                                        <TableRow key={index}>
                                            <TableRowColumn>
                                                <Link to={`/items/${listValue.list_id}`}>{listValue.name} </Link>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <DelButton 
                                                    list_id={listValue.list_id}
                                                    callback={this.props.callback}
                                                />
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <EditBtnMdl 
                                                    list_id={listValue.list_id}
                                                    callback={this.props.callback}
                                                    name={listValue.name}
                                                />
                                            </TableRowColumn>
                                        </TableRow>
                                    )
                                }
                            })
                            :(
                                <TableRow>
                                    <TableRowColumn>
                                        <p> Nothing here yet. Add something! </p>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        );
    }
}

export default Lister;
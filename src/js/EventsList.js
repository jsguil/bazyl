import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class EventsList extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} search pagination>
          <TableHeaderColumn isKey dataField='BlockNumber' width='10%' >Block Number</TableHeaderColumn>
          <TableHeaderColumn dataField='Topics'>Topics</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default EventsList;

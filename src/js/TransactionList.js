import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class TransactionList extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data} search pagination>
          <TableHeaderColumn isKey dataField='blockNumber'>Block Number</TableHeaderColumn>
          <TableHeaderColumn dataField='gas'>Gas</TableHeaderColumn>
          <TableHeaderColumn dataField='gasPrice'>Gas Price</TableHeaderColumn>
          <TableHeaderColumn dataField='from'>From</TableHeaderColumn>
          <TableHeaderColumn dataField='to'>To</TableHeaderColumn>
          <TableHeaderColumn dataField='value'>Value</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TransactionList;

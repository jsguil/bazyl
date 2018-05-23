import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class Balances extends Component {

  remote(remoteObj) {
    // Only cell editing, insert and delete row will be handled by remote store
    remoteObj.dropRow = true;
    return remoteObj;
  }

  render() {

    const selectRow = {
      mode: 'radio'
    };
    return (
      <div>
        <BootstrapTable data={this.props.balancesTable}
                        selectRow={ selectRow }
                        remote={ this.remote }
                        deleteRow search pagination
                        options={ {
                          onDeleteRow: this.props.onDeleteRow,
                        } }
                        >
          <TableHeaderColumn isKey dataField='id' hidden>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='address'>Address</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='value'>Value</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Balances;

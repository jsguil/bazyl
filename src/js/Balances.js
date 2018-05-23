/* eslint-disable */
import React from 'react'
import {Button,
        Collapse,
        Form,
        FormGroup,
        Label,
        Input} from 'reactstrap';
import BalancesList from './BalancesList'
import cookie from 'react-cookies'

class Balances extends React.Component {
  constructor(props) {
    super(props)
    this.settingsBalances = this.settingsBalances.bind(this);
    this.handleAddressBalancesChange = this.handleAddressBalancesChange.bind(this)
    this.setNewBalance = this.setNewBalance.bind(this)
    this.setBalances = this.setBalances.bind(this)
    this.getBalanceInfo = this.getBalanceInfo.bind(this)
    this.deleteBalance = this.deleteBalance.bind(this)
    this.state = {
      web3: null,
      settingsBalances: false,
      addressBalances: "",
      balancesTable: [],
      balanceIndex: 0,
    }
  }

  componentWillReceiveProps(){
    this.setState({ web3 : this.props.web3 });
    this.setState({ enable : this.props.enable });
  }

  componentWillMount() {
    this.setBalances()
    setInterval(()=> this.refreshBalances(), 5000)
  }

  settingsBalances() {
    this.setState({ settingsBalances: !this.state.settingsBalances });
  }

  setNewBalance(){
    this.getBalanceInfo(this.state.addressBalances)
    this.setState({ addressBalances : ""});
  }

  setBalances(){
    if(cookie.load("balances") !== undefined){
      this.setState({ balanceIndex : cookie.load("balanceIndex")});
      this.setState({ balancesTable : cookie.load("balances")});
    }
    else{
      this.setState({ balanceIndex : 0});
      this.setState({ balancesTable : []});
    }

  }

  handleAddressBalancesChange (input) {
    this.setState({ addressBalances : input.target.value });
  }

  getBalanceInfo(address){
    let balance = {}
    let balances = this.state.balancesTable
    balance.address = address
    this.state.web3.eth.getBalance(balance.address).then(respond => {
      balance.value = respond/1000000000000000000 + " Ether"
      this.state.web3.eth.getCode(balance.address).then(respond => {
        if(respond === '0x'){
          balance.type = "Account"
        }
        else{
          balance.type = "Contract"
        }
        balance.id = parseInt(this.state.balanceIndex) + 1
        this.setState({ balanceIndex : balance.id});
        balances.push(balance)
        this.setState({ balancesTable : balances});
        cookie.save("balances", balances, {path: "/"});
        cookie.save("balanceIndex", this.state.balanceIndex, {path: "/"});
      })
    })
  }

  deleteBalance(row) {
    let table = this.state.balancesTable
    for (let i =0; i < table.length; i++){
      if(table[i].id === row[0]){
        table.splice(i, 1)
        break;
      }
    }
    this.setState({ balancesTable : table});
    cookie.save("balances", this.state.balancesTable, {path: "/"});
  }

  refreshBalances() {
    let balances = this.state.balancesTable
    for(let i=0; i < this.state.balancesTable.length ; i++){
      try{
        this.state.web3.eth.getBalance(this.state.balancesTable[i].address).then(respond => {
          balances[i].value = respond/1000000000000000000 + " Ether"
        })
      }
      catch(err){

      }
    }
    this.setState({ balancesTable : balances});
    cookie.save("balances", balances, {path: "/"});
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.settingsBalances} style={{ marginBottom: '1rem' }}>Add</Button>
        <Collapse isOpen={this.state.settingsBalances}>
          <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="addressInput" className="mr-sm-2" >Address</Label>
              <Input type="text" onChange={this.handleAddressBalancesChange} id="addressInput" placeholder="Enter and address" value={this.state.addressBalances} />
            </FormGroup>
          </Form>
          <br/>
          <Button onClick={this.setNewBalance}>Submit</Button>
        </Collapse>
        <br/>
        <BalancesList onDeleteRow={ this.deleteBalance } balancesTable={this.state.balancesTable} { ...this.state } />
      </div>
    );
  }
}

export default Balances

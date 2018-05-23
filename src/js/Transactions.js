/* eslint-disable */
import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input} from 'reactstrap';
import TransactionList from './TransactionList'
var transactions = [];

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.handleLiveChange = this.handleLiveChange.bind(this)
    this.handleExplorationChange = this.handleExplorationChange.bind(this)
    this.handleFromBlockChange = this.handleFromBlockChange.bind(this)
    this.handleToBlockChange = this.handleToBlockChange.bind(this)
    this.getTransactionHystory = this.getTransactionHystory.bind(this)
    this.settings = this.settings.bind(this)
    this.state = {
      web3: null,
      settings: false,
      isLive: true,
      lastBlock: 0,
      fromBlock: 0,
      toBlock: 0,
    }
  }

  componentWillReceiveProps(){
    this.setState({ web3 : this.props.web3 });
    this.setState({ isLive : this.props.enable });
    this.getTransactionLive()
  }

  componentWillMount() {
    setInterval(()=> this.getTransactionLive(), 5000)
  }

  getTransactionLive() {
    //Get the last block number
    //console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now());
    try{
      this.state.web3.eth.getBlockNumber().then(respond => {
        let sameBlock = (respond === this.state.lastBlock)
        this.setState({lastBlock: respond})
        if(this.state.isLive && !sameBlock){
          transactions = []
          this.getTransactionHistory(this.state.lastBlock).then(respond => {
              let trans = respond.transactions;
              let lastBlock = 0;
              for (let i=0; i < respond.transactions.length; i++){
                let transaction = {};
                if(respond.transactions.length > i){
                  transaction.blockNumber = trans[i].blockNumber
                  transaction.gasPrice = trans[i].gasPrice/1000000000 + " Gwei"
                  transaction.gas = trans[i].gas
                  transaction.value = trans[i].value/1000000000000000000 + " Ether"
                  lastBlock = transaction.blockNumber - 1
                  transaction.from = trans[i].from
                  transaction.to = trans[i].to
                  transactions.push(transaction)
                }
              }
              return this.getTransactionHistory(lastBlock)
          })
        }
      })
    }
    catch(err){

    }
  }

  getTransactionHystory(){
    if(!this.state.isLive){
      let j= this.state.fromBlock
      transactions = []
      let history = this.getTransactionHistory(this.state.fromBlock)
      for (j; j <= this.state.toBlock; j++){
        history = history.then(respond => {
          let trans = respond.transactions;
          let lastBlock = 0;
          for (let i=0; i < respond.transactions.length; i++){
            let transaction = {};
            if(respond.transactions.length > i){
              transaction.blockNumber = trans[i].blockNumber
              transaction.gasPrice = trans[i].gasPrice/1000000000
              transaction.gas = trans[i].gas
              transaction.from = trans[i].from
              transaction.to = trans[i].to
              transaction.value = trans[i].value/1000000000000000000
              lastBlock = transaction.blockNumber + 1
              transactions.push(transaction)
            }
          }
          return this.getTransactionHistory(lastBlock)
        })
      }
    }
  }

  getTransactionHistory(block){
    return this.state.web3.eth.getBlock(block,true)
  }

  settings() {
    this.setState({ settings: !this.state.settings });
  }

  handleLiveChange () {
    this.setState({ isLive : true });
  }

  handleExplorationChange () {
    this.setState({ isLive : false });
  }

  handleFromBlockChange (input) {
    this.setState({ fromBlock : input.target.value });
  }

  handleToBlockChange (input) {
    this.setState({ toBlock : input.target.value });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.settings} style={{ marginBottom: '1rem' }}>Settings</Button>
        <Collapse isOpen={this.state.settings}>
          <Form inline>
            <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
              <Label check>
                <Input type="radio" name="radio2" onChange={this.handleLiveChange} />{' '}
                Live
              </Label>
            </FormGroup>
            <FormGroup check className="mb-2 mr-sm-2 mb-sm-0">
              <Label check>
                <Input type="radio" name="radio2" onChange={this.handleExplorationChange} />{' '}
                Exploration
              </Label>
            </FormGroup>
          </Form>
        </Collapse>
        <Collapse isOpen={this.state.settings && !this.state.isLive}>
          <Form>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="fromBlock" className="mr-sm-2" >From block</Label>
              <Input type="number" min="1" max={this.state.lastBlock} onChange={this.handleFromBlockChange} id="fromBlock" placeholder="Enter the first block number" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="toBlock" className="mr-sm-2" >To block</Label>
              <Input type="number" min={this.state.fromBlock} max={this.state.lastBlock} onChange={this.handleToBlockChange} id="toBlock" placeholder="Enter the last block number" />
            </FormGroup>
          </Form>
          <br/>
          <Button color="primary" onClick={this.getTransactionHystory}>Submit</Button>
        </Collapse>
        <TransactionList data={transactions}/>
      </div>
    );
  }
}

export default Transactions;

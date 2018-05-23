/* eslint-disable */
import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import Block from './Block'
import BlockChart from './BlockChart'

class General extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      activeNode: 0,
      gasPrice: 0,
      gasLimit: 0,
      lastBlockTime: 0,
      lastBlockMiner: 0,
      enable: false,
      transactionChartOptions: {
        title: 'Transactions History',
        hAxis: { title: 'Block number' },
        colors: ['#00cc00', '#003300'],
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
      },
      transactionChartdata: [
        ['Block', 'Quantity', 'Difficulty'],
        [0,0,0]
      ],
      gasChartOptions: {
        title: 'Gas History',
        hAxis: { title: 'Block number' },
        colors: ['#00cc00', '#003300'],
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
      },
      gasChartdata: [
        ['Block', 'Gas', 'Gas limit'],
        [0,0,0]
      ],
    }
  }

  componentWillReceiveProps(){
    this.setState({ web3 : this.props.web3 });
    this.setState({ enable : this.props.enable });
    this.getBlockChaineInformation()
  }

  componentWillMount() {
    setInterval(()=> this.getBlockChaineInformation(), 5000)
  }

  getBlockChaineInformation() {
    //Get the last block number
    try{
      this.state.web3.eth.getBlockNumber().then(respond => {
        let sameBlock = (respond === this.state.lastBlock)
        this.setState({lastBlock: respond})
        if(!sameBlock && this.state.enable){
          this.getGeneralChartData()
        }
        return this.state.web3.eth.getBlock(this.state.lastBlock,true)
      }).then( respond => {
        try{
          var date = new Date(respond.timestamp*1000);
          this.setState({lastBlockTime: date.toString()})
          this.setState({lastBlockMiner: respond.miner})
          let gas = respond.gasLimit + ' gas'
          this.setState({gasLimit: gas})
        }
        catch(err){

        }
      })

      //Get the last gas price
      this.state.web3.eth.getGasPrice((error, respond) => {
        let price = respond/1000000000 + ' Gwei'
        this.setState({gasPrice: price})
      })

      //get number of peers
      this.state.web3.eth.net.getPeerCount().then( respond => {
        this.setState({activeNode: respond})
      })
    }
    catch(err){
      //this.getBlockChaineInformation()
    }

  }

  getGeneralChartData(){
    let j= parseInt(this.state.lastBlock) - 20
    if (j <= 0){
      j = 1
    }
    let lastblock = 0
    let transactions = []
    let gasData = []
    transactions.push(['Block', 'Quantity', 'Difficulty'])
    gasData.push(['Block', 'Gas used', 'Gas limit'])
    let history = this.getTransactionHistory(j)
    for (j; j <= this.state.lastBlock; j++){
      history = history.then(respond => {
        try{
          transactions.push([parseInt(respond.number), parseInt(respond.transactions.length),parseInt(respond.difficulty)])
          gasData.push([parseInt(respond.number), parseInt(respond.gasUsed),parseInt(respond.gasLimit)])
          lastblock = respond.number + 1
          if(lastblock < this.state.lastBlock){
            return this.getTransactionHistory(lastblock)
          }
          else{
            this.setState({ transactionChartdata: transactions });
            this.setState({ gasChartdata: gasData });
          }
        }
        catch(err){

        }
      })
    }
  }

  getTransactionHistory(block){
    return this.state.web3.eth.getBlock(block,true)
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={{ size: 4, order: 2, offset: 1 }}>
            <Block header='Last Block' body={this.state.lastBlock}/>
            <br/>
            <Block header='Active Node' body={this.state.activeNode}/>
            <br/>
            <Block header='Gas Price' body={this.state.gasPrice}/>
            <br/>
            <Block header='Gas Limit' body={this.state.gasLimit}/>
            <br/>
            <Block header='Last Block Time' body={this.state.lastBlockTime}/>
            <br/>
            <Block header='Last Block Miner' body={this.state.lastBlockMiner}/>
            <br/>
          </Col>
          <Col sm={{ size: 6, order: 2, offset: 0 }}>
            <div className='chartDiv'>
              <BlockChart data={this.state.transactionChartdata} options={this.state.transactionChartOptions}/>
              <BlockChart data={this.state.gasChartdata} options={this.state.gasChartOptions}/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default General;

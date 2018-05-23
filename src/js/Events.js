import React from 'react';
import {Button,
        FormGroup,
        Label,
        Input} from 'reactstrap';
import cookie from 'react-cookies';
import EventsList from "./EventsList";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      jsonFile: {contractName:'None'},
      contractAddress: '',
      topic: '',
      contract: null,
      eventList: [],
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.addNewSubscribe = this.addNewSubscribe.bind(this);
    this.onStart = this.onStart.bind(this);
    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState({ jsonFile: JSON.parse(event.target.result) }, () => {
        this.setState({ contract : new this.state.web3.eth.Contract(this.state.jsonFile.abi,this.state.contractAddress) });
      });
    };
  }

  componentDidMount() {
    this.onStart()
  }

  onStart() {
    this.setState({ contractAddress : cookie.load("contractAddress") });
    this.setState({ topic : cookie.load("topic") });
    this.setState({ eventList : cookie.load("events") });
  }

  componentWillReceiveProps(){
    this.setState({ web3 : this.props.web3 });
  }

  handleAddressChange (input) {
    this.setState({ contractAddress : input.target.value });
    cookie.save("contractAddress", input.target.value, {path: "/"});
  }

  handleTopicChange (input) {
    this.setState({ topic : input.target.value });
    cookie.save("topic", input.target.value, {path: "/"});
  }

  addNewSubscribe () {
    //console.log(this.state.web3);
    //0x38979119752B1891ae9B5cD6986285eA3190AE38
    //console.log(this.state.web3.utils.keccak256('Event1(address,bytes32)'))
    this.setState({ eventList : [] });
    this.state.web3.eth.getPastLogs({
        address: this.state.contractAddress,
        //fromBlock: "0x55B950",
        fromBlock: this.state.web3.utils.numberToHex(1),
        toBlock: "latest",
        topics: [this.state.web3.utils.keccak256(this.state.topic)]
    })
    .then(events => {
      let types;
      if(this.state.topic !== '' ){
        types = this.state.topic.split("(");
        types = types[1].split(")");
        types = types[0].split(",");
      }
      let type;
  		for (let i=0; i<events.length; i++) {
  			var eventObj = events[i];
        if(eventObj.topics !== undefined){
          let row = {}
          row.BlockNumber = eventObj.blockNumber
          row.Topics = ''
          for (let i=0; i<eventObj.topics.length; i++) {
            if(this.state.topic !== ''){
              if(i===0){
                row.Topics += 'Topic ' + i + ': ' + this.state.topic + ', '
              }
              else {
                type = types[i - 1]
                if (type.includes("byte") || (type === 'string')){
                  row.Topics += 'Topic ' + i + ': ' + this.state.web3.utils.hexToString(eventObj.topics[i]) + ', '
                }
                else if(type.includes("uint") || type.includes("int")){
                  row.Topics += 'Topic ' + i + ': ' + this.state.web3.utils.hexToNumber(eventObj.topics[i]) + ', '
                }
                else if(type.includes("address") || type.includes("bool")){
                  row.Topics += 'Topic ' + i + ': ' + eventObj.topics[i].replace('0x000000000000000000000000','0x') + ', '
                }
                else{
                  row.Topics += 'Topic ' + i + ': ' + eventObj.topics[i] + ', '
                }
              }
            }
            else{
              row.Topics += 'Topic ' + i + ': ' + eventObj.topics[i] + ', '
            }

          }
          this.state.eventList.push(row)
          cookie.save("events", this.state.eventList, {path: "/"});
        }

  		}
    })

  }

  saveEvents(){
    var element = document.createElement("a");
    let array = cookie.load("events");
    let text = 'Block Number, Topics\n'
    for (let i = 0; i < array.length; i++){
      text += array[i].BlockNumber + ', ' + array[i].Topics + '\n'
    }
    var file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "eth-tree_events.txt";
    element.click();
  }

  render() {
    return (
      <div>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="contractAddress" className="mr-sm-2" >Contract address</Label>
          <Input type="text" onChange={this.handleAddressChange} id="contractAddress" placeholder="Exemple : 0x6c3ddf319f7ee6b50c578cf8c4347b926a8f58a9" />
          <br/>
          <Label for="topic" className="mr-sm-2" >Topic</Label>
          <Input type="text" onChange={this.handleTopicChange} id="topic" placeholder="Keep only types and remove every spaces: Event1(address indexed _from, bytes32 indexed _name) => Event1(address,bytes32)" />
        </FormGroup>
        <br/>
        Address = {this.state.contractAddress}; Topic = {this.state.topic};
        <br/>
        <Button color="primary" onClick={this.addNewSubscribe}>Submit</Button>
        <EventsList data={this.state.eventList}/>
        <br/>
        <Button color="primary" onClick={this.saveEvents}>Save events</Button>
      </div>
    );
  }
}

export default Events;

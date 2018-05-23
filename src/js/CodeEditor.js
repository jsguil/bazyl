/* eslint-disable */
import ReactAce from 'react-ace-editor';
import React from 'react';
import {Button,
        FormGroup,
        Label,
        Input} from 'reactstrap';
import cookie from 'react-cookies';
import Files from "react-files";

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      jsonFile: {contractName:'None'},
      contractAddress: '',
      contract: null
    };
    this.onStart = this.onStart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.executeCode = this.executeCode.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
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

  componentWillReceiveProps(){
    this.setState({ web3 : this.props.web3 });
  }

  onStart() {
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.setValue(cookie.load("code"), 0)
    //console.log(editor.getValue()); // Outputs the value of the editor
    cookie.save("code", editor.getValue(), {path: "/"});

  }

  onChange(newValue, e) {
    const editor = this.ace.editor; // The editor object is from Ace's API
    //console.log(editor.getValue()); // Outputs the value of the editor
    cookie.save("code", editor.getValue(), {path: "/"});
  }

  executeCode() {
    const editor = this.ace.editor;
    let web3 = this.state.web3
    let contract = this.state.contract;
    eval(editor.getValue())
  }

  handleAddressChange (input) {
    this.setState({ contractAddress : input.target.value });
  }

  saveCode(){
    var element = document.createElement("a");
    var file = new Blob([cookie.load("code")], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "eth-tree_code.js";
    element.click();
  }

  render() {
    return (
      <div>
        <h4> Step 1 : Enter your contract address. </h4>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="contractAddress" className="mr-sm-2" >Contract address</Label>
          <Input type="text" onChange={this.handleAddressChange} id="contractAddress" placeholder="Exemple : 0x6c3ddf319f7ee6b50c578cf8c4347b926a8f58a9" />
        </FormGroup>
        <br/>
        <h4> Step 2 : Load your contract abi into the app. </h4>
        <div className="files">
          <Files
           className="files-dropzone"
           onChange={file => {
             this.fileReader.readAsText(file[0]);
           }}
           onError={err => console.log(err)}
           accepts={[".json"]}
           multiple
           maxFiles={3}
           maxFileSize={10000000}
           minFileSize={0}
           clickable
          >
           Drop contract abi or click to upload <br/>
          </Files>
          <br/>
        </div>
        <h4> Step 3 : Test your contract with some javascript code. </h4>
        <Button color="primary" onClick={this.executeCode}>Run code</Button>
        <br/>
        <br/>
        <div>
          Use web3 and contract variables to get the web3 and contract instances.<br/>
          contract = {this.state.jsonFile.contractName}; address = {this.state.contractAddress};
        </div>
        <ReactAce
          mode="javascript"
          theme="eclipse"
          onChange={this.onChange}
          style={{ height: '400px' }}
          ref={instance => { this.ace = instance; }} // Let's put things into scope
        />
        <br/>
        <h4> Step 4 : Save your code to use later. </h4>
        <Button color="primary" onClick={this.saveCode}>Save code</Button>
      </div>
    );
  }
}

export default CodeEditor;

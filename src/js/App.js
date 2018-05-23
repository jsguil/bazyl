import React, { Component } from 'react'
import {
  Alert,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Jumbotron,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import getWeb3 from '../utils/getWeb3'
import Balances from './Balances'
import Events from './Events'
import CodeEditor from './CodeEditor'
import General from './General'
import Transactions from './Transactions'

//import '../css/oswald.css'
//import '../css/open-sans.css'
//import '../css/pure-min.css'
import '../css/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.transaction = this.transaction.bind(this);
    this.balances = this.balances.bind(this);
    this.general = this.general.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.codeEditor = this.codeEditor.bind(this)
    this.events = this.events.bind(this)
    this.state = {
      alart: false,
      storageValue: 0,
      web3: null,
      transaction: true,
      codeEditor: true,
      events : true,
      balances:true,
      general:true,
      navCollapsed: true,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.refreshWeb3()
    })
    .catch((error) => {
      console.log('here')
      this.setState({alart: true})
      this.setState({
        web3: null
      })
      console.log(error)
    })

  }

  refreshWeb3(){
    this.setState({
      web3: this.state.web3
    })
  }

  toggleNavbar() {
    this.setState({
      navCollapsed: !this.state.navCollapsed
    });
  }

  transaction() {
    this.setState({ transaction: !this.state.transaction });
  }

  balances() {
    this.setState({ balances: !this.state.balances });
  }

  general() {
    this.setState({ general: !this.state.general });
  }

  codeEditor() {
    this.setState({ codeEditor: !this.state.codeEditor });
  }

  events() {
    this.setState({ events: !this.state.events });
  }

  render() {
      return (
        <div>
          <div>
            <Navbar fixed={`top`} light expand="md">
              <NavbarBrand href="/" className="mr-auto">BAZYL <small> (alpha) Ethereum explorer dapp</small></NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse isOpen={!this.state.navCollapsed} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Sections
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="#generalDiv">General</DropdownItem>
                      <DropdownItem href="#balancesDiv">Balances</DropdownItem>
                      <DropdownItem href="#transactionsDiv">Transactions</DropdownItem>
                      <DropdownItem href="#eventsDiv">Events</DropdownItem>
                      <DropdownItem href="#codeEditorDiv">Code editor</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <NavLink href="https://github.com/jsguil/bazyl">GitHub</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <Jumbotron id='generalDiv'>
            <Collapse isOpen={this.state.alart}>
              <Alert color="danger">
                You must install the MetaMask extension or the Mist browser. Check <a href="https://metamask.io/">https://metamask.io/</a> for more information.
              </Alert>
            </Collapse>
            <h2 onClick={this.general}>General information</h2>
            <br/>
            <Collapse isOpen={this.state.general}>
              <General web3={this.state.web3} enable={this.state.general}/>
            </Collapse>
          </Jumbotron>
          <Jumbotron id='balancesDiv'>
            <h2 onClick={this.balances}>Balances</h2>
            <br/>
            <Collapse isOpen={this.state.balances}>
              <Balances web3={this.state.web3} enable={this.state.balances}/>
            </Collapse>
          </Jumbotron>
          <Jumbotron id='transactionsDiv'>
            <h2 onClick={this.transaction}>Transactions</h2>
            <br/>
            <Collapse isOpen={this.state.transaction}>
              <Transactions web3={this.state.web3} enable={this.state.transaction}/>
            </Collapse>
          </Jumbotron>
          <Jumbotron id='eventsDiv'>
            <h2 onClick={this.events}>Events</h2>
            <br/>
            <Collapse isOpen={this.state.events}>
              <Events web3={this.state.web3}/>
            </Collapse>
          </Jumbotron>
          <Jumbotron id='codeEditorDiv'>
            <h2 onClick={this.codeEditor}>Code editor</h2>
            <br/>
            <Collapse isOpen={this.state.codeEditor}>
              <CodeEditor web3={this.state.web3}/>
            </Collapse>
          </Jumbotron>
        </div>
      );
  }
}

export default App

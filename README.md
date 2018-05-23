# bazyl
Bazyl is an Ethereum explorer dapp entended to be used with metamask or Mist.

Bazyl as been created with the react truffle box : [ref-1]. You can use the dapp directly from [here](http://www.bazyl.io).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Bazyl works with Metamask chrome extension or Mist browser. Follow those link for how to install them :

[MetaMask](https://metamask.io/)
[Mist](https://github.com/ethereum/mist)

To run and test bazyl on your local machine, you will need yo install node.js/npm:

[Node.js](https://nodejs.org/en/download/)

If you want to create and add smart contracts to the project, you can install Truffle :

[Truffle](http://truffleframework.com/docs/getting_started/installation)

### Installing

You can install Bazyl on your local machine with those command :

```
Give the example
$ git clone https://github.com/jsguil/bazyl.git
$ cd bazyl
$ npm install
```

You can than run the project using the follow command :

```
$ npm run start
```

## Deployment

For Deployment, use the following command :

```
$ npm run build
```

### Events

To follow your events, enter the address of your contract in the Events section and enter your topic.

Not acceptable topic format

```
Event1(address indexed _from, bytes32 indexed _name)
```

Acceptable topic format

```
Event1(address,bytes32)
```

### Testing a smart contracts

Testing a smart contract with bazyl, you will need to create the abi file. From Truffle, you can use the JSON from the build directly. To compile your file, you can use the following command :

```
$ truffle compile
```
More information can be fund from that link : http://truffleframework.com/docs/getting_started/compile
You can than drop the JSON file in the Code editor section of Bazyl.

To test your contract with the code editor, you will need the address of your deployed contract. Than you can test some function using the contract variable. Exemple:

```
contract.methods.myMethod(...)
```
For more information, you can check the web3 documentation :

[web3](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html)

## Built With

* [Truffle](http://truffleframework.com/boxes/react) - The truffle box used
* [web3.js](https://web3js.readthedocs.io/en/1.0/#) - Ethereum JavaScript API
* [Node.js](http://truffleframework.com/boxes/react) - Javascript runtime
* [npm](https://www.npmjs.com/) - Package Management


## Authors

* **Jean-Sébastien Guillemette** - *Initial work* - [jsguil](https://github.com/jsguil)

See also the list of [contributors](https://github.com/jsguil/bazyl/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

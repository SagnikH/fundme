const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); //it is a constructor function, creates instances of web3 library
const web3 = new Web3(ganache.provider());


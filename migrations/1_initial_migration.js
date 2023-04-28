const Web3 = require('web3')
const BN = Web3.utils.BN
const Migrations = artifacts.require("Migrations");
const TNT20 = artifacts.require("TNT20");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Migrations);
  const dec18 = new BN('1000000000000000000')

  let name = "Awesome Token"
  let symbol = "AST"
  let initDistrWallet = "0x1563915e194D8CfBA1943570603F7606A3115508" // corresponding to privatekey "0x2222....22222", please do NOT use this for the mainnet deployment!
  let initMintAmount = dec18.mul(new BN(100000000)) // 100 million AST tokens (i.e. 100,000,000 * 10e18 AST Wei) will be minted to the initDistrWallet
  let admin = "0x5CbDd86a2FA8Dc4bDdd8a8f69dBa48572EeC07FB" // corresponding to privatekey "0x3333....33333", please do NOT use this  for the mainnet deployment!
  deployer.deploy(TNT20, name, symbol, initDistrWallet, initMintAmount, admin)
};

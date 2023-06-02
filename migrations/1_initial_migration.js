const Web3 = require('web3')
const BN = Web3.utils.BN
const Migrations = artifacts.require("Migrations");
const TNT20 = artifacts.require("TNT20");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Migrations);
  const dec18 = new BN('1000000000000000000')

  let name = "Thetaquest Token"
  let symbol = "Tquec"
  let initDistrWallet = "0x1502B75f0eF25Fa1Fe5b79594da566047859645e" // corresponding to privatekey "0x2222....22222", please do NOT use this for the mainnet deployment!
  let initMintAmount = dec18.mul(new BN(100000000)) // 100 million AST tokens (i.e. 100,000,000 * 10e18 AST Wei) will be minted to the initDistrWallet
  let admin = "0x1133F74838ED79D07129aE2256C754e4AB79546b" // corresponding to privatekey "0x3333....33333", please do NOT use this  for the mainnet deployment!
  deployer.deploy(TNT20, name, symbol, initDistrWallet, initMintAmount, admin)
};

const { exit } = require("process");
const { getContext, tnt20TokenABI } = require('./utils')

const printTNT20TokenBalance = async(network, tnt20TokenContractAddress, walletAddr) => {
    let {web3, _} = getContext(network)
    const tnt20TokenContract = new web3.eth.Contract(tnt20TokenABI, tnt20TokenContractAddress)
    tokenName = await tnt20TokenContract.methods.name().call()
    tokenSymbol = await tnt20TokenContract.methods.symbol().call()
    tokenBalance = await tnt20TokenContract.methods.balanceOf(walletAddr).call()
    console.log(tokenName, "balance of wallet", walletAddr, ":", tokenBalance, tokenSymbol, "Wei")
}

//
// MAIN
//

const args = process.argv.slice(2);
if (args.length != 3) {
    console.log("Usage:")
    console.log("    node scripts/query_tnt20_token_balance.js <Network> <TNT20TokenContractAddress> <WalletAddress>")
    console.log("")
    exit(1)
}
let network = args[0]
let tnt20TokenContractAddress = args[1]
let walletAddr = args[2]

printTNT20TokenBalance(network, tnt20TokenContractAddress, walletAddr)
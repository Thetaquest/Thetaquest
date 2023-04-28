const { exit } = require("process");
const { getContext, tnt20TokenABI } = require('./utils')

const printTNT20TokenDetails = async(network, tnt20TokenContractAddress) => {
    let {web3, _} = getContext(network)
    const tnt20TokenContract = new web3.eth.Contract(tnt20TokenABI, tnt20TokenContractAddress)
    tokenName = await tnt20TokenContract.methods.name().call()
    tokenSymbol = await tnt20TokenContract.methods.symbol().call()
    tokenDecimals = await tnt20TokenContract.methods.decimals().call()
    totalSupply = await tnt20TokenContract.methods.totalSupply().call()

    console.log("")
    console.log("==================== Token details =====================")
    console.log("Address     :", tnt20TokenContractAddress)
    console.log("Name        :", tokenName)
    console.log("Symbol      :", tokenSymbol)
    console.log("Decimals    :", tokenDecimals)
    console.log("Total supply:", totalSupply, tokenSymbol, "Wei")
    console.log("")
}

//
// MAIN
//

const args = process.argv.slice(2);
if (args.length != 2) {
    console.log("Usage:")
    console.log("    node scripts/print_tnt20_token_details.js <Network> <TNT20TokenContractAddress>")
    console.log("")
    exit(1)
}

let network = args[0]
let tnt20TokenContractAddress = args[1]

printTNT20TokenDetails(network, tnt20TokenContractAddress)


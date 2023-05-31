const contractABI = [/* Paste your contract ABI here */];
const contractAddress = '0x123456789...'; // Replace with your contract address

// Instantiate the contract object
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example function call
contract.methods.joinQuiz().send({ from: accounts[0], value: entrancePrice })
  .then((result) => {
    // Handle the transaction result
  })
  .catch((error) => {
    // Handle the transaction error
  });

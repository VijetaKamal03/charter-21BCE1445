const { JsonRpcProvider } = require("ethers"); // Import ethers

// Initialize the provider
const provider = new JsonRpcProvider("https://sepolia.infura.io/v3/f8113bec25834ec9a48193dee57cb913");

async function fetchTransactions(blockNumber) {
    // Fetch block with basic details, including transaction hashes
    const block = await provider.getBlock(blockNumber);
    
    // Check if there are transactions in the block and return their hashes
    if (block && block.transactions && block.transactions.length > 0) {
        console.log(`Transactions in block ${blockNumber}:`, block.transactions);
    } else {
        console.log(`No transactions found in block ${blockNumber}.`);
        console.log("Block details:", block);  // Output block details for further investigation
    }
}

// Replace 123456 with a valid block number
fetchTransactions(7041100).then(console.log).catch(console.error);

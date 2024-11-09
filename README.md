# charter-21BCE1445

Merkle Proof Verification System
This project demonstrates a blockchain-based Merkle Proof Verification system that verifies transaction inclusion in a Merkle tree. The setup includes a smart contract deployed on the Ethereum Sepolia testnet, a React-based frontend for interacting with the contract, and a backend script to generate Merkle proofs.

Table of Contents
Project Overview
Technologies Used
Prerequisites
Project Setup
Instructions
Troubleshooting
Project Overview
This project:

Creates a Merkle tree to verify transaction inclusion.
Deploys a smart contract to the Sepolia testnet.
Uses a React interface to interact with the smart contract by setting the Merkle root and verifying transaction proofs.
Technologies Used
Node.js - For backend scripting and generating Merkle proofs.
Web3.js - For blockchain interactions on the frontend.
React.js - For building the user interface.
Solidity - For smart contract development.
Ethereum Sepolia Testnet - For contract deployment and testing.
Merkle Tree Library (merkletreejs) - For Merkle proof generation.
Prerequisites
Node.js (version 22.11.0) or higher
MetaMask - Installed and connected to the Sepolia testnet.
Web3 Provider - To connect to the Sepolia testnet.
React App - Set up to interact with the smart contract.
Project Setup
Install Dependencies
In the project root directory, install the necessary dependencies:

npm install web3 merkletreejs react

Smart Contract Deployment

Use the Solidity code provided in this project to deploy the smart contract on the Sepolia testnet.
Note the deployed contract address to use in the frontend React application.
Generate Merkle Tree and Proofs Create a merkleproof.js file to generate the Merkle root and proof for specific transaction hashes:

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Sample transactions
const transactions = ['transaction1', 'transaction2', 'transaction3'];
const leaves = transactions.map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const root = tree.getRoot().toString('hex');

console.log("Merkle Root:", root);
Run this with:

bash
Copy code
node merkleproof.js
React Frontend Setup In your React app, initialize a Web3 instance, connect to MetaMask, and interact with the smart contract using the provided functions to set the Merkle root and verify transactions.

Run the Project

npm start

Instructions
Set the Merkle Root
In the React interface, enter the Merkle root generated in step 3.

Verify Transaction Inclusion

Input a transaction hash and corresponding Merkle proof in the fields provided.
Click “Verify Transaction” to validate inclusion in the Merkle tree.
Troubleshooting
Module Not Found: Ensure merkletreejs and other dependencies are installed using npm install.
Decoding Errors: Check that the ABI used in React matches the deployed smart contract.
Transaction Invalid: Verify that the Merkle proof is generated correctly and the correct transaction hash is used.

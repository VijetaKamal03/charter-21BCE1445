import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [merkleRoot, setMerkleRoot] = useState('');
  const [txHash, setTxHash] = useState('');
  const [merkleProof, setMerkleProof] = useState('');
  const [isValid, setIsValid] = useState(null);


  const contractAddress = '0x6fdB2B95173b01096e3068bFCed0Cd6D0F9b008D'; // Replace with your contract address
  const contractABI = [ {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bytes32",
            "name": "newMerkleRoot",
            "type": "bytes32"
          }
        ],
        "name": "MerkleRootUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "bool",
            "name": "isValid",
            "type": "bool"
          }
        ],
        "name": "ProofVerified",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_merkleRoot",
            "type": "bytes32"
          }
        ],
        "name": "setMerkleRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "transactionHash",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32[]",
            "name": "proof",
            "type": "bytes32[]"
          }
        ],
        "name": "verifyTransaction",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "merkleRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      } ];

  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Get the user's account
      const accounts = await web3Instance.eth.requestAccounts();
      setAccount(accounts[0]);

      // Initialize contract
      const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
    };

    if (window.ethereum) {
      initWeb3();
    } else {
      alert("Please install MetaMask to use this app!");
    }
  }, []);

  const handleSetMerkleRoot = async () => {
    await contract.methods.setMerkleRoot(merkleRoot).send({ from: account });
  };

  const handleVerifyTransaction = async () => {
    const result = await contract.methods.verifyTransaction(txHash, JSON.parse(merkleProof)).call();

    setIsValid(result);
  };

  return (
    <div>
      <h1>Merkle Proof Verification</h1>
      <p>Account: {account}</p>

      {/* Set Merkle Root */}
      <div>
        <input
          type="text"
          placeholder="Merkle Root"
          value={merkleRoot}
          onChange={(e) => setMerkleRoot(e.target.value)}
        />
        <button onClick={handleSetMerkleRoot}>Set Merkle Root</button>
      </div>

      {/* Verify Transaction */}
      <div>
        <input
          type="text"
          placeholder="Transaction Hash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
        />
        <input
          type="text"
          placeholder="Merkle Proof"
          value={merkleProof}
          onChange={(e) => setMerkleProof(e.target.value)}
        />
        <button onClick={handleVerifyTransaction}>Verify Transaction</button>
      </div>

      {isValid !== null && (
  <p>
    Transaction is {isValid ? 'Valid' : 'Invalid'} in the Merkle tree.
  </p>
)}

    </div>
  );
};

export default App;

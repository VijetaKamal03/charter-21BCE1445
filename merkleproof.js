const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Transaction hashes in your dataset
const leaves = [
  '0xc6916c682b315453d37182c9df26b87be91242581029e41df1fa52ea68cc8a0b', // replace with actual transaction hashes
  '0x3b5aa6550af94b7add28f49836cf305bb2d68dc531068757d5c7382cf4691569',
  '0xb84e82148a58fea9e84885b234791cbea44dd3dd893f6f4dd1e366cf74ef034f'
].map(x => keccak256(x));

// Generate the Merkle tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get the Merkle root
const root = tree.getHexRoot();

// Get the proof for a specific transaction hash
const transactionHash = keccak256('0xb84e82148a58fea9e84885b234791cbea44dd3dd893f6f4dd1e366cf74ef034f'); // replace with the actual transaction hash
const proof = tree.getHexProof(transactionHash);

console.log('Merkle Root:', root);
console.log('Merkle Proof:', proof);

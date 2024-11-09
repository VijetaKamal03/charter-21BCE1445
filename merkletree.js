const crypto = require('crypto');

// Function to hash data using SHA256
function hashData(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Function to build a Merkle tree from transaction hashes
function buildMerkleTree(transactionHashes) {
    let tree = transactionHashes.map(hash => hashData(hash));

    // Build the tree layer by layer
    while (tree.length > 1) {
        let level = [];
        for (let i = 0; i < tree.length; i += 2) {
            if (i + 1 < tree.length) {
                // Combine two hashes and hash them to form the parent node
                level.push(hashData(tree[i] + tree[i + 1]));
            } else {
                // If there’s an odd number, duplicate the last hash to pair with itself
                level.push(hashData(tree[i] + tree[i]));
            }
        }
        tree = level;
    }

    // The Merkle root is the single hash at the top of the tree
    return tree[0];
}

// Function to generate a Merkle proof for a transaction hash
function generateMerkleProof(transactionHash, transactionHashes) {
    let proof = [];
    let tree = transactionHashes.map(hash => hashData(hash));
    let index = tree.indexOf(hashData(transactionHash));

    // Ensure the transaction exists in the tree
    if (index === -1) {
        throw new Error("Transaction hash not found in the block.");
    }

    // Build the tree and generate the proof
    while (tree.length > 1) {
        let level = [];
        for (let i = 0; i < tree.length; i += 2) {
            if (i + 1 < tree.length) {
                if (i === index || i + 1 === index) {
                    proof.push(tree[i + 1 === index ? i : i + 1]);
                }
                level.push(hashData(tree[i] + tree[i + 1]));
            } else {
                level.push(hashData(tree[i] + tree[i]));
            }
        }
        tree = level;
    }

    return proof;
}

// Example usage:
const transactionHashes = [
    '0xc6916c682b315453d37182c9df26b87be91242581029e41df1fa52ea68cc8a0b', // replace with actual transaction hashes
  '0x3b5aa6550af94b7add28f49836cf305bb2d68dc531068757d5c7382cf4691569',
  '0xb84e82148a58fea9e84885b234791cbea44dd3dd893f6f4dd1e366cf74ef034f'   // Transaction 3 hash
];

// Generate Merkle root
const merkleRoot = buildMerkleTree(transactionHashes);
console.log('Merkle Root:', merkleRoot);

// Generate Merkle proof for a specific transaction
const transactionHashToVerify = '0xb84e82148a58fea9e84885b234791cbea44dd3dd893f6f4dd1e366cf74ef034f'; // Transaction hash to verify
const proof = generateMerkleProof(transactionHashToVerify, transactionHashes);
console.log('Merkle Proof:', proof);

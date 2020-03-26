const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate('9ab120dc426849967a07b001ee2ce63d87571eff4a21596789160c888ae99ef7');
const myWalletAddress = myKey.getPublic('hex');

let UtechCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
UtechCoin.addTransaction(tx1);

//UtechCoin.createTransaction(new Transactions('address1', 'address2', 100));
//UtechCoin.createTransaction(new Transactions('address2', 'address1', 50));

console.log('\n Starting the miner...');
UtechCoin.minePendingTransactions(myWalletAddress);

console.log('\n Balance of antoinne is', UtechCoin.getBalanaceOfAddress(myWalletAddress));


//console.log('\n Starting the miner again...');
//UtechCoin.minePendingTransactions('antoinneaddress');

//console.log('\n Balance of antoinne is', UtechCoin.getBalanaceOfAddress('antoinneaddress'));

//console.log('mining block 1...');
//UtechCoin.addBlock(new Block(1, "03/03/2020", {amount: 4}));

//console.log('mining block 2...');
//UtechCoin.addBlock(new Block(1, "03/05/2020", {amount: 10}));



//console.log('Is chain valid? ' + UtechCoin.isChainValid()); // checks if blockchain is valid

//UtechCoin.chain[1].data = {amount:100}; // tampers with block and attempts to add illegal money
//UtechCoin.chain[1].hash = UtechCoin.chain[1].calculateHash(); // attempts to recalculate hash value to avoid detection

//console.log('Is chain valid? ' + UtechCoin.isChainValid());


//console.log(JSON.stringify(UtechCoin, null, 4));


const {Blockchain, Transaction} = require('./blockchain');
let UtechCoin = new Blockchain();

//UtechCoin.createTransaction(new Transactions('address1', 'address2', 100));
//UtechCoin.createTransaction(new Transactions('address2', 'address1', 50));

//console.log('\n Starting the miner...');
//UtechCoin.minePendingTransactions('antoinneaddress');

//console.log('\n Balance of antoinne is', UtechCoin.getBalanaceOfAddress('antoinneaddress'));


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


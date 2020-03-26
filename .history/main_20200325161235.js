const SHA256 = require('crypto-js/sha256');

class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty +1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.minigReward = 100;
    }

    createGenesisBlock(){
        return new Block("02/03/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block Successfully minde');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transactions){
        this.pendingTransactions.push(transactions);
    }

    getBalanaceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;

    }

    isChainValid(){
        for(let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let UtechCoin = new Blockchain();

UtechCoin.createTransaction(new Transactions('address1', 'address2', 100));
UtechCoin.createTransaction(new Transactions('address2', 'address1', 50));

console.log('\n Starting the miner...');
UtechCoin.minePendingTransactions('antoinneaddress');

console.log('\n Balance of antoinne is', UtechCoin.getBalanaceOfAddress('antoinneaddress'));

//console.log('mining block 1...');
//UtechCoin.addBlock(new Block(1, "03/03/2020", {amount: 4}));

//console.log('mining block 2...');
//UtechCoin.addBlock(new Block(1, "03/05/2020", {amount: 10}));



//console.log('Is chain valid? ' + UtechCoin.isChainValid()); // checks if blockchain is valid

//UtechCoin.chain[1].data = {amount:100}; // tampers with block and attempts to add illegal money
//UtechCoin.chain[1].hash = UtechCoin.chain[1].calculateHash(); // attempts to recalculate hash value to avoid detection

//console.log('Is chain valid? ' + UtechCoin.isChainValid());


//console.log(JSON.stringify(UtechCoin, null, 4));


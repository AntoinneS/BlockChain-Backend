const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "02/03/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

console.log('mining block 1...');
UtechCoin.addBlock(new Block(1, "03/03/2020", {amount: 4}));

console.log('mining block 2...');
UtechCoin.addBlock(new Block(1, "03/05/2020", {amount: 10}));



//console.log('Is chain valid? ' + UtechCoin.isChainValid()); // checks if blockchain is valid

//UtechCoin.chain[1].data = {amount:100}; // tampers with block and attempts to add illegal money
//UtechCoin.chain[1].hash = UtechCoin.chain[1].calculateHash(); // attempts to recalculate hash value to avoid detection

//console.log('Is chain valid? ' + UtechCoin.isChainValid());


//console.log(JSON.stringify(UtechCoin, null, 4));


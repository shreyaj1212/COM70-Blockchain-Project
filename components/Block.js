Transaction = require('./Transaction');
const {
    createHmac,
  } = require('crypto');

const  MAX_NUM_TRANSACTIONS = 3;

class Block{
    
    constructor(precedingHash){
        // this.timestamp = timestamp;
        this.data = [];
        this.maxTransactions = MAX_NUM_TRANSACTIONS;
        this.precedingHash = precedingHash;
        this.hash = "";
        this.proofOfWork = "";
    }

    getMaxTransactions() {
        return this.maxTransactions;
    }

    getCurNumTransactions() {
        return this.data.length;
    }

    canAddTrans() {
        return this.data.length < this.maxTransactions;
    }

    /*
     * adds transaction to the block
     */
    addTransaction(transaction)
    {
        if(transaction.signatureIsValid())
        {
            this.data.push(transaction);
            // transaction.updateNodesWealth();
            transaction.updateStatus("completed");
        }
    }

    getProofOfWork()
    {
        return this.proofOfWork;
    }

    /* is there any way to make this a private method?*/
    setProofOfWork(proof)
    {
        this.proofOfWork = proof;
        this.hash = createHmac('sha256', this.proofOfWork).digest('hex');
    }

    getHash()
    {
        return this.hash;
    }

    getPrecedingHash()
    {
        return this.precedingHash;
    }

    getData() {
        return this.data;
    }

}

module.exports = Block;
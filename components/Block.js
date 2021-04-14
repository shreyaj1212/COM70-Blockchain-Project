Transaction = require('./Transaction');

class Block{
    constructor(index, timestamp, precedingHash=" ", proofOfWork){
        this.index = index;
        this.timestamp = timestamp;
        data = [];
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.proofOfWork = proofOfWork;   
    }

    /*
     * adds transaction to the block
     */
    addTransaction(transaction, signature)
    {
        data.push(transaction);
        transaction.updateStat("completed");

        if(data.length>=20)
        {
            /*Network.computeHash();*/
        }
    }
}
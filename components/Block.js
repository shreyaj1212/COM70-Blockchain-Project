Transaction = require('./Transaction');

class Block{
    constructor(timestamp, precedingHash, proofOfWork){
        this.timestamp = timestamp;
        data = [];
        this.precedingHash = precedingHash;
        /*this.hash = this.computeHash();*/
        this.proofOfWork = "";   
    }

    /*
     * adds transaction to the block
     */
    addTransaction(transaction)
    {
        if(transaction.signatureIsValid())
        {
            data.push(transaction);
            transaction.updateNodesWealth();
            transaction.updateStat("completed");
            if(data.length>=20)
            {
                /*Network.computeHash();*/
            }
        }
    }

    getProofOfWork()
    {
        return this.proofOfWork;
    }

    /* is there any way to make this a private method?*/
    setProofOfWork(proof)
    {
        proofOfWork = proof;
    }

    getHash()
    {
        /* return function(proofOfWork); */
    }
}
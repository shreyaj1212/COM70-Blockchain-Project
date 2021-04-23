Node = require('./Node');

class Blockchain {
    constructor(owner) {
        this.owner = owner;
        this.chain = [];
    }

    lastBlock()
    {
        return chain[chain.length-1];
    }

    addNewBlock(Block)
    {
        /* hash = hash_funciton(proofOfWork) */
        /*if(Block.getHash == function(lastBlock().getProofOfWork())
        && function(Block.getProofOfWork()).substr(0,4) == "0000" )
        {
            chain.push(Block);
        }*/
    }
}

module.exports = Blockchain;
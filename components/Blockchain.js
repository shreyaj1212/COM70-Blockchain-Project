User = require('./User');

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
        if((Block.getPrecedingHash() === null||Block.getPrecedingHash() == lastBlock().getHash())
        && createHmac('sha256', Block.getProofOfWork()).digest('hex').substr(0,1) == "0000" )
        {
            chain.push(Block);
        }
    }
}

module.exports = Blockchain;



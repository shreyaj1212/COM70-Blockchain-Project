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

    addNewBlock(block1)
    {
        if((block1.getPrecedingHash() === null||block1.getPrecedingHash() == lastBlock().getHash())
        && createHmac('sha256', block1.getProofOfWork()).digest('hex').substr(0,1) == "0000" )
        {
            chain.push(block1);
        }
    }
}

module.exports = Blockchain;



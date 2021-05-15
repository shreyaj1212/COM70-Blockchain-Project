User = require('./User');
const {
    createHmac,
  } = require('crypto');

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
        if(block1.getPrecedingHash() === null||block1.getPrecedingHash() == lastBlock().getHash())
        {
            chain.push(block1);
        }
    }
}

module.exports = Blockchain;



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
        return this.chain[this.chain.length-1];
    }

    addNewBlock(block1)
    {
        if(block1.getPrecedingHash() === null||block1.getPrecedingHash() == this.lastBlock().getHash())
        {
            this.chain.push(block1);
        }
    }
}

module.exports = Blockchain;



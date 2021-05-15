User = require('./User');
const {
    createHmac,
  } = require('crypto');
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o','p', 'q', 'r',
's', 't', 'v', 'w', 'x', 'y', 'z'];

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
        && this.isLetter(createHmac('sha256', block1.getProofOfWork()).digest('hex').substr(0,1).toLowerCase()))
        {
            chain.push(block1);
        }
    }

    isLetter(letter)
    {
        return letters.includes(letter);
    }
}

module.exports = Blockchain;



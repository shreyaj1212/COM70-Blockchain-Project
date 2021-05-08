Node = require('./User');

class Blockchain {
    constructor() {
        // this.firstNode = startNode;
        this.chain = [];
    }

    addBlockToChain(block) {
        this.chain.push(block);
    }

    getLastBlock() {

    }
}

module.exports = Blockchain;
Node = require('./Node');

class Blockchain {
    constructor(startNode) {
        this.firstNode = startNode;
        this.chain = [];
    }
}

module.exports = Blockchain;
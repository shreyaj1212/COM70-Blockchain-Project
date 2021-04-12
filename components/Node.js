Transaction = require('./Transaction');

class Node {
    constructor() {
        this.totalWealth = 0;
        this.ipAddress = "";
        this.isMiner = False;
        this.secretKey = "";
    }

    // constructor for miners
    constructor(isMiner) {
        this.totalWealth = 0;
        this.ipAddress = "";
        this.isMiner = isMiner;
        this.secretKey = "";
    }

    getWealth() {
        return this.totalWealth;
    }

    // parameters are another Node and the quantity you would like 
    // another user to pay you. Calls signTransaction on another user
    // this node is the seller; otherNode is the buyer
    makeTransaction(otherNode, numCoin) {
        if(otherNode.getWealth() <= numCoin) {
            return "not possible"; // COME UP WITH A BETTER RESPONSE ONCE APIs ARE SET UP
        }
        else {
            transaction = new Transaction(otherNode, this, numCoin);
        }
    }

    /* 
     * gives the user an option to decline in 
     * which case the method ends; else, the user’s 
     * secret key is transformed using a hash function 
     * into a unique public key. The function 
     * then calls addTransaction on the current block.
     */
    signTransaction() {

    }

    updateBalance () {

    }
}

module.exports = Node;
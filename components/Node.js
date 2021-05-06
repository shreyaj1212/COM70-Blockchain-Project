Transaction = require('./Transaction');
const {
    createHmac,
  } = require('crypto');

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

    /*
     * creates a transaction 
     * parameters are another Node and the quantity you would like 
     * that Node to pay you. Calls signTransaction on the other user
     * this node is the buyer (the one that takes the money); 
     * otherNode is the seller (that gives the money)
     * each node's balance will be updated in the Transaction constructor
     */ 
    makeTransaction(otherNode, numCoin) {
        if(otherNode.getWealth() <= numCoin) {
            return "not possible"; // COME UP WITH A BETTER RESPONSE ONCE APIs ARE SET UP
        }
        else {
            try{
                if(otherNode.getWealth()-numCoin>0) {
                    transaction = new Transaction(otherNode, this, numCoin, otherNode.signTransaction());
                }
                else {
                    return new Error(); // GET A BETTER RESPONSE ONCE APIs ARE SET UP
                }
            }
            catch(e) {
                console.error(e);
            }
        }
    }

    /* 
     * gives the user an option to decline in 
     * which case the method ends; else, the user’s 
     * secret key is transformed using a hash function 
     * into a unique public key. The function 
     * then calls addTransaction on the current block.
     * THIS METHOD SHOULD RETURN THE SIGNATURE
     * id is the transaction id
     */
    signTransaction(id) {
        /* option to decline */
        /* else return function(this.secretKey, id); */

    }

    updateBalance (addThisAmt) {
        var temp = this.totalWealth + addThisAmt;
        if(temp > 0) {
            this.totalWealth = temp;
        }
    }

    verifyTransaction(id, signature)
    {
        return signature == createHmac('sha256', this.secretKey).update(id).digest('hex');
    }
}

module.exports = Node;
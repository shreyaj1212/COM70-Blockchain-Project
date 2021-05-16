Transaction = require('./Transaction');
const uuid = require('uuid');
const {
    createHmac,
  } = require('crypto');
 
class User {
    constructor(wealth, ipadd, secretkey) {
        this.totalWealth = Number(wealth);
        this.ipAddress = ipadd;
        this.secretKey = secretkey;
    }

    /*// constructor for miners
    constructor(isMiner) {
        this.totalWealth = 0;
        this.ipAddress = "";
        this.isMiner = isMiner;
        this.secretKey = "";
    }*/

    getWealth() {
        return this.totalWealth;
    }

    getName() {
        return this.ipAddress;
    }

    getKey() {
        return this.secretKey;
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
        // if(Math.floor(Math.random()*4)<3)
         return createHmac('sha256', this.secretKey).update(id).digest('hex');
        // else
        //  return null;

    }

    canUpdateBalance(amt) {
        return (this.totalWealth + amt) > 0;
    }

    updateBalance (addThisAmt) {
        var temp = this.totalWealth + Number(addThisAmt);
        if(temp > 0) {
            this.totalWealth = temp;
            return true;
        }
        else return false;
    }

    verifyTransaction(id, signature)
    {
        return signature!=null&&signature == createHmac('sha256', this.secretKey).update(id).digest('hex');
    }

    compProof()
    {
        //come up with random string
        let rand = uuid.v4();
        console.log(rand);
        if(Number(createHmac('sha256', rand).digest('hex').substr(0,1))<5)
        {
            return rand;
        }
        else
        {
            return false;
        }
    }
}
module.exports = User;
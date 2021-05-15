const uuid = require('uuid');
const User = require('./User');
class Transaction {

    /*
     * SELLER = GIVER
     * BUYER = TAKER
     */
    constructor(buyNode, sellNode, amount) {
        this.buyer = buyNode;
        this.seller = sellNode;
        this.amt = amount;
        this.signature = null;
        //this.timestamp = Date();
        this.status = "noMoneyTransferredYet";
        this.id = uuid.v4();
    }

    signTransaction(sign) {
        this.signature = sign;
    }

    signatureIsValid() {
        return this.seller.verifyTransaction(this.id, this.signature);
    }

    /*
     * the below code should be edited; the transaction should be added
     * to a block before the money is transferred (note from grace:
     * we can just call this method in the addTransaction method
     * after verifying that signatures are valid)
     */
    updateNodesWealth() {
        console.log("got into updateNodesWealth");
        if(!this.seller.updateBalance(-1*this.amt)) return false;
        console.log("did not return false");
        console.log(typeof seller);
        console.log(typeof buyer);
        this.buyer.updateBalance(this.amt);
        console.log("wealths for both updated");
        this.updateStatus("moneyTransferred;NotInBlockYet");
        console.log("transaction status updated");
        return true;
    }

    updateStatus(newStat) {
        this.status = newStat;
    }

    getBuyer() {
        return this.buyer;
    }

    getSeller() {
        return this.buyer;
    }

    getAmt() {
        return this.amt;
    }

    getId(){
        return this.id;
    }
}

module.exports = Transaction;


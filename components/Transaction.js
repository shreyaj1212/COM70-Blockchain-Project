class Transaction {

    constructor(buyNode, sellNode, amount, sign) {
        this.buyer = buyNode;
        this.seller = sellNode;
        this.amt = amount;
        this.signature = sign;
        this.timestamp = Date();
        this.status = "noMoneyTransferredYet";
        this.updateNodesWealth();
        this.id = /* figure out how to generate random double */
    }

    signatureIsValid() {
        return sellNode.verifyTransaction(this.signature, this.id);
    }

    /*
     * the below code should be edited; the transaction should be added
     * to a block before the money is transferred (note from grace:
     * we can just call this method in the addTransaction method
     * after verifying that signatures are valid)
     */
    updateNodesWealth() {
        this.buyer.updateBalance(this.amt);
        this.seller.updateBalance(-1*this.amt);
        this.updateStatus("moneyTransferred;NotInBlockYet");
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
const alphabet = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u',
'v','w','x','y','z'];

class Transaction {

    constructor(buyNode, sellNode, amount, sign) {
        this.buyer = buyNode;
        this.seller = sellNode;
        this.amt = amount;
        this.signature = sign;
        this.timestamp = Date();
        this.status = "noMoneyTransferredYet";
        this.updateNodesWealth();
        this.id = randomString();
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

    randomString()
    {
        while(true)
        {
            var s = "";
            for(int i = 0; i<5; i++)
            {
                s = s+alphabet[Math.floor(Math.random()*26)];
            }
            /*if unique*/
            break;
        }
        return s;
    }

}

module.exports = Transaction;
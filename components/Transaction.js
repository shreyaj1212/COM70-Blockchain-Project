class Transaction {

    constructor(buyNode, sellNode, amount) {
        this.buyer = buyNode;
        this.seller = sellNode;
        this.amt = amount;
        this.timestamp = Date();
        this.status = "incomplete";
    }

    updateStatus(newStat) {
        this.status = newStat;
    }

}

module.exports = Transaction;
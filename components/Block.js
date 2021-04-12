class Block{
    constructor(index, timestamp, precedingHash=" ", proofOfWork){
     this.index = index;
     this.timestamp = timestamp;
     data = [];
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();  
     this.proofOfWork = proofOfWork;   
    }
    addTransaction(amount, from, to, signature)
    {
        data.push("\n" + from + " gave $" + amount + " to " to + 
        ". Signature: " + signature);
        from.updateBalance(-amount);
        if(data.length>=20)
        {
            /*Network.computeHash();*/
        }
    }
}
class Block{
    constructor(index, timestamp, precedingHash=" ", proofOfWork){
     this.index = index;
     this.timestamp = timestamp;
     data = "";
     this.precedingHash = precedingHash;
     this.hash = this.computeHash();  
     this.proofOfWork = proofOfWork;   
    }
    addTransaction(amount, from, to, signature)
    {
        
    }
}
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
}

module.exports = Node;
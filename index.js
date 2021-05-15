const express = require('express');
const uuid = require('uuid');
const path = require('path');
const User = require('./components/User');
const Blockchain = require('./components/Blockchain');
const Block = require('./components/Block');
const Transaction = require('./components/Transaction');

const app = express();

const users = [];
const blockchain = new Blockchain();

const startBlock = new Block(null);
var curBlock = startBlock;
blockchain.addNewBlock(curBlock);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// GET THE FRONT PAGE OF WEBSITE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

// VIEW ALL THE USERS
app.get('/api/users', (req, res) => {
    res.json(users);
});

// MAKE NEW USER
app.post('/api/makeUser', (req,res) => {
    // User constructor takes in wealth and id
    // randomly assigning a new id for each user for now
    // wealth can be whatever is specified in the body (probably 0)
    var newUser = new User(req.body.wealth, req.body.name, uuid.v4());
    users.push(newUser);
    console.log(users);
    console.log("*******");
    res.send("Added the new user successfully");
}); 

function computeProof()
{
    i=0;
    while(true)
    {
        let proof = users[i].compProof();
        if(proof.isString())
        {
            users[i].updateBalance(12);
            return proof;
        }
    }
}

// MAKE NEW TRANSACTION
app.post('/api/makeTransaction', (req,res) => {
    var newTransaction = new Transaction(req.body.buyerId, req.body.sellerId, req.body.amount, req.body.signature);
    // NEED TO ADD CODE ABOUT VERIFYING THE TRANSACTION

    if(!newTransaction.signatureIsValid()) {
        res.send("Cannot add new transaction because signature is invalid");
    }
    
    if(!newTransaction.updateNodesWealth()) {
        res.send("Could not add new transaction due to insufficient funds");
    }

    if(curBlock.canAddTrans()) {
        curBlock.addTransaction(newTransaction);
    }
    else {
        var tempPreceedingHash = curBlock.getHash();
        curBlock.setProofOfWork(computeProof());
        /*
         * we add a block to the blockchain when it's created (noting
         * this for consistency)
         */
        curBlock = new Block(tempPreceedingHash);
        blockchain.addNewBlock(curBlock);
        curBlock.addTransaction(newTransaction);
    }
    res.send("Successfully added new transaction");
});

// VIEW THE BLOCKCHAIN
app.get('/api/getBlockchain', (req, res) => {
    // get the blockchain
    // iterate to get each block
    // within each block get relevant info of each transaction
    res.json(blockchain);
});

// UPDATE A USER'S WEALTH
app.put('/api/updateUserWealth', (req,res) => {
    for(var i = 0;i< users.length;i++) {
        if(users[i].getName()==req.body.name) {
            if(users[i].updateBalance(req.body.amount)) {
                res.send("Successfully updated balance");
            }
            else res.send("Could not update balance due to insignificant funds");
        }
        res.send("This user does not exist");
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
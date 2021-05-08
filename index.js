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
        /*
         * here I have created the new block (please correct if I did this wrong)
         * but rn for me the Blockchain class is empty, and so I haven't added
         * any of the blocks to the blockchain 
         * 
         * but we should add a block to the blockchain when it's created (noting
         * this for consistency)
         */
        curBlock = new Block(tempPreceedingHash);
        curBlock.addTransaction(newTransaction);
    }
    res.send("Successfully added new transaction");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const exphbs = require('express-handlebars');

const User = require('./components/User');
const Blockchain = require('./components/Blockchain');
const Block = require('./components/Block');
const Transaction = require('./components/Transaction');
const { FORMERR } = require('dns');

const app = express();

const users = [];
const blockchain = new Blockchain();

const startBlock = new Block(null);
var curBlock = startBlock;
blockchain.addNewBlock(curBlock);

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Blockchain Simulation',
    users
  })
);

// // GET THE FRONT PAGE OF WEBSITE
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','index.html'));
// });

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
    res.redirect('/');
    // res.json(users);
    // res.send("Added the new user successfully");
}); 

// MAKE NEW TRANSACTION
// req: buyerId, sellerId, amount, signature, transactionSimType
app.post('/api/makeTransaction', (req,res) => {
    // if req.body.isSigned == True, then do what is planned
    /* 
    * and instead of req.body.signature, it'll be buyerId.getSignature
    */
    // else if req.body.isSigned == False, then just don't do anything
    // else if req.body.isSigned == fraud, then generate random signature
    /* 
    * and instead of req.body.signature, generate a random signature that should not work
    */

    if(req.body.transactionSimType == "not signed") res.send("nothing happens");
    else {
        var giver = null;
        var taker = null;
        for(var i = 0;i<users.length;i++) {
            if(users[i].getName() == req.body.sellerId) {
                giver = users[i];
                if(giver!=null && taker !=null) break;
            }
            if(users[i].getName() == req.body.buyerId) {
                taker = users[i];
                if(giver!=null && taker !=null) break;
            }
        }
        
        
        var newTransaction = new Transaction(taker, giver, req.body.amount);

        if(req.body.transactionSimType == "signed") {
            newTransaction.signTransaction(giver.signTransaction(newTransaction.getId())); // this is the signature
        }
        else if(req.body.transactionSimType == "fraud") {
            newTransaction.signTransaction(uuid.v4());
        }
        else {
            res.send("how did this happen");
        }

        // Making Sure signature is valid
        if(!newTransaction.signatureIsValid()) {
            res.send("Cannot add new transaction because signature is invalid");
        }
        
        // updating the wealth of the nodes
        if(!newTransaction.updateNodesWealth()) {
            res.send("Could not add new transaction due to insufficient funds");
        }

        // ADDING TO BLOCKCHAIN
        if(curBlock.canAddTrans()) {
            curBlock.addTransaction(newTransaction);
        }
        else {
            var tempPreceedingHash = curBlock.getHash();
            /*
            * we add a block to the blockchain when it's created (noting
            * this for consistency)
            */
            curBlock = new Block(tempPreceedingHash);
            blockchain.addNewBlock(curBlock);
            curBlock.addTransaction(newTransaction);
        }
        if(req.body.transactionSimType == "signed") {
            res.send(req.body.sellerId + " gave " + req.body.buyerId +" " + req.body.amount + " coins." + giver.getName() + " now has "
            + giver.getWealth() + " coins.");
        }
        else if(req.body.transactionSimType == "fraud") {
            res.send("nah fraud");
        }
    }
    
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
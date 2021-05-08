const express = require('express');
const uuid = require('uuid');
const path = require('path');
const User = require('./components/User');

const app = express();

const users = [];

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
    var newUser = new User(req.body.wealth, uuid.v4());
    users.push(newUser);
    res.send("Added the new user successfully");
}); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
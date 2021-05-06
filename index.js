const express = require('express');
const uuid = require('uuid');
const path = require('path');
const User = require('./components/User');

const app = express();

const users = [];

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
    // res.send('<head><link rel="stylesheet" href="./style.css"></head><body><h1>Shreya and Grace\'s Blockchain Project</h1></body>');
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/makeUser', (req,res) => {
    var newUser = new User();
    res.send(req.body);
}); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
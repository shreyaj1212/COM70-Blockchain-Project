const express = require('express');
const User = require('./components/User');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Shreya and Grace\'s Blockchain Project</h1>');
});

app.get('/makeNode', (req,res) => {
    var newUser = new User();
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
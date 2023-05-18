const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const popular = require('./data/popular.json');

app.get('/', (req, res) => {
    res.send('Hello Toys');
})
app.get('/popular', (req, res) => {
    res.send(popular);
})
app.listen(port, () => {
    console.log(`This port is running on port : ${port}`);
})
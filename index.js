const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const popular = require('./data/popular.json');




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2b4mnlf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const toysCollection = client.db('ToyStore').collection('salesToys');

        // get data by category
        app.get('/categoryToy/:category', async (req, res) => {
            const category = req.params.category;
            const filter = { category: category }
            const result = await toysCollection.find(filter).toArray();
            res.send(result);
        })
        
        // get all sales toys data
        app.get('/allToy', async (req, res) => {
            const result = await toysCollection.find().toArray();
            res.send(result)
        })

        app.post('/addToy', async (req, res) => {
            const toyInfo = req.body;
            const result = await toysCollection.insertOne(toyInfo);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Toys');
})
app.get('/popular', (req, res) => {
    res.send(popular);
})


app.listen(port, () => {
    console.log(`This port is running on port : ${port}`);
})
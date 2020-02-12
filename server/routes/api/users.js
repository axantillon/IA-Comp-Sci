const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

// Get all users
router.get('/', async (req,res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
})

// Get user filtered by :id
router.get('/:id', async (req,res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray() )
})

// Add a new user
router.post('/', async (req,res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        name: req.body.name,
        createdAt: new Date()
    });
    
    res.status(201).send();
})

router.put('/:id', async (req,res) => {
    const users = await loadUsersCollection();
    await items.updateOne(
        { $and: [ { week: req.params.week}, {_id: mongodb.ObjectID(req.params.id)} ]},
        {
            $inc: {quantity: -req.body.quantity },
            $currentDate: { lastModified: true }
        }
    );

    res.status(204).send();
})

// Function to connect and retrieve database
async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('main').collection('users');
}

module.exports = router;
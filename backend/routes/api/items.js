const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

// Get all items
router.get('/', async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({}).toArray());
});

// Get all items filtered by :week
router.get('/:week', async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({ week: req.params.week }).toArray());
});

//Add Item for :week
router.post('/', async (req,res) => {
    const items = await loadItemsCollection();
    await items.insertOne({
        //week: req.params.week,
        name: req.body.name,
        quantity: req.body.quantity,
        createdAt: new Date()
    });
    
    res.status(201).send();
});

// Update quantity on item filtered by :week and :id
router.put('/:name', async(req,res) => {
    const items = await loadItemsCollection();
    await items.updateOne(
        {name: req.params.name},
        {
            $inc: {quantity: -req.body.quantity }, //update quantity field
            $currentDate: { lastModified: true }   //Add Date for when it was Last Modified
        }
    );

    res.status(204).send();
});

//Delete Item for :week & :id
router.delete('/:name', async(req,res) => {
    const items = await loadItemsCollection();
    await items.deleteOne( {name: req.params.name} );
    res.status(200).send({}); 
});

// Function to connect and retrieve database
async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect(
        //'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/test?retryWrites=true&w=majority',
        'mongodb://localhost:27017',
        {
            // These are set to avoid errors
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('main').collection('items');
};

module.exports = router;
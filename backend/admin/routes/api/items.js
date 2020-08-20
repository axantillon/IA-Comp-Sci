const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get all items
router.get('/', async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({}).toArray());
});

// Get item by :item_id
router.get('/:item_id',async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({
        _id: mongodb.ObjectId(req.params.item_id)
    }).toArray());
});

//Add Item 
router.post('/', async (req,res) => {
    const items = await loadItemsCollection();
    await items.insertOne({
        "name": req.body.name,
        "description": req.body.description,
    });
    
    res.status(201).send();
});

// Update description on item by :id
router.put('/:item_id', async(req,res) => {
    const items = await loadItemsCollection();
    await items.updateOne(
        {_id: mongodb.ObjectId(req.params.id)},
        {
            description: req.body.description,
        }
    );

    res.status(204).send();
});

//Delete Item by :id
router.delete('/:id', async(req,res) => {
    const items = await loadItemsCollection();
    await items.deleteOne( {_id: mongodb.ObjectId(req.param.id)} );
    res.status(200).send({}); 
});

// Function to connect and retrieve database
async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/main?retryWrites=true&w=majority',
        //'mongodb://localhost:27017',
        {
            // These are set to avoid errors
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('main').collection('items');
};

module.exports = router;
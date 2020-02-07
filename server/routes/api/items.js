const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

router.get('/', async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({}).toArray());
})

router.get('/:week', async (req,res) => {
    const items = await loadItemsCollection();
    res.send(await items.find({ week: req.params.week }).toArray());
})

//Add Item for :week
router.post('/:week', async (req,res) => {
    const items = await loadItemsCollection();
    await items.insertOne({
        week: req.params.week,
        name: req.body.name,
        quantity: req.body.quantity,
        createdAt: new Date()
    });
    
    res.status(201).send();
})

//Delete Item for :week
router.delete('/:week/:id', async(req,res) => {
    const items = await loadItemsCollection();
    await items.deleteOne({ $and: [ { week: req.params.week}, { _id: new mongodb.ObjectID(req.params.id) } ]});
    res.status(200).send({}); 
})

//Put User/volunteer and change Quantity
router.put('/:week/:id', async(req,res) => {
    const items = await loadItemsCollection();
    await items.updateOne(
        { $and: [ { week: req.params.week}, {_id: mongodb.ObjectID(req.params.id)} ]},
        {
            $inc: {quantity: -req.body.quantity },
            $currentDate: { lastModified: true }
        }
    );

    res.status(204).send();
})

async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('main').collection('items');
}

module.exports = router;
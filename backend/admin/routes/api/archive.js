const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get archive for week by :week_id
router.get('/:week_id', async (req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id));
    res.send(await archive_week.find({}).toArray());
});

// Add new item entry for item needed for week to archive_week by :week_id
router.post('/:week_id', async (req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id))
    const items = await loadItemsCollection()

    const item = await items.find({
                    _id: mongodb.ObjectId(req.body.item_id)
                }).toArray()
    
    await archive_week.insertOne({
        "item_name": item[0].name,
        "item_description": item[0].description,
        "original_amount": req.body.amount_needed,
        "amount_needed": req.body.amount_needed,
        "volunteers": [],
    })

    res.status(201).send()
})


// Function to connect and retrieve week archive by :week_id
async function loadArchiveWeek(week_id) {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/main?retryWrites=true&w=majority',
        //'mongodb://localhost:27017',
        {
            // These are set to avoid errors
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    
    console.log("Retriveing", week_id, "collection")
    return client.db('archive').collection(week_id);
};


// Function to connect and retrieve main weeks collection
async function loadWeeksCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/main?retryWrites=true&w=majority',
        //'mongodb://localhost:27017',
        {
            // These are set to avoid errors
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('main').collection('weeks');
};

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
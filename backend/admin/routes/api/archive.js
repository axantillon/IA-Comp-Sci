const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get archive for week by :week_id
router.get('/:week_id', async (req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id));
    res.send(await archive_week.find({}).toArray());
});

// Create new collection to archive a week
router.post('/new_archive/:week_id', async (req,res) => {
    const archive_db = await loadArchiveDatabase()
    const main_weeks = await loadWeeksCollection()
    const week_id = String(req.params.week_id)

    await main_weeks.insertOne({
        archive_week_id: week_id,
        date_created: new Date(),
    })

    await archive_db.createCollection(week_id)

    res.status(201).send()
})

// Add new item entry for item needed for week to archive_week by :week_id
router.post('/:week_id', async (req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id))
    const items = await loadItemsCollection()

    console.log(req.body.item_id)
    console.log(req.body.amount_needed)

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

// update an item by :entry_id from archive_week by :week_id
router.put('/:week_id/:entry_id', async(req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id))
    const user_id = req.body.user_id;
    const amount_volunteer = req.body.amount_volunteer;

    await archive_week.updateOne(
        {_id: mongodb.ObjectId(req.params.entry_id)},
        {
            $push: {"volunteers": {
                $each: [ {"user_id": user_id, "amount_volunteered": amount_volunteer}]
            }},
            $inc: {"amount_needed": -amount_volunteer }, //update quantity field
            $currentDate: { lastModified: true }   //Add Date for when it was Last Modified
        }
    );

    res.status(204).send();
});


// Function to connect and retrieve archive database
async function loadArchiveDatabase() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://alaas:tGnWBguQBIPKrBXJ@comp-sci-ia-db-xohqr.mongodb.net/main?retryWrites=true&w=majority',
        //'mongodb://localhost:27017',
        {
            // These are set to avoid errors
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    
    console.log("Retriveing Archive Database")
    return client.db('archive')
};


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

    return client.db('main').collection('item_test');
};

module.exports = router;
const express = require('express');
const mongodb = require('mongodb');


const router = express.Router();

// Get all weeks
router.get('/', async (req,res) => {
    const weeks = await loadWeeksCollection();
    res.send(await weeks.find({}).toArray());
});

// Create new collection to archive a week
router.post('/:week_id', async (req,res) => {
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

module.exports = router;
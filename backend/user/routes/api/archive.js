const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get archive for week by :week_id
router.get('/:week_id', async (req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id));
    res.send(await archive_week.find({}).toArray());
});

// update an item by :entry_id from archive_week by :week_id
router.put('/:week_id/:entry_id', async(req,res) => {
    const archive_week = await loadArchiveWeek(String(req.params.week_id))
    const user_email = req.body.user_email;
    const amount_volunteer = req.body.amount_volunteer;

    await archive_week.updateOne(
        {_id: mongodb.ObjectId(req.params.entry_id)},
        {
            $push: {"volunteers": {
                $each: [ {"user_email": user_email, "amount_volunteered": amount_volunteer}]
            }},
            $inc: {"amount_needed": -amount_volunteer }, //update quantity field
            $currentDate: { lastModified: true }   //Add Date for when it was Last Modified
        }
    );

    res.status(204).send();
});


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

module.exports = router;
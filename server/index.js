const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose')

const app = express();

// mongoose.connect("mongodb://localhost:27017/testdb",{ useNewUrlParser :"true"});

// mongoose.connection.on("error",(err)=>{

//     console.log("err",err);

// });

// mongoose.connection.on("connected",(err,res) => {
//     console.log("mongoose is connected");
// });


//  Middleware
app.use(bodyParser.json());
app.use(cors());

const items = require('./routes/api/items');

app.use('/api/items', items);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port: ${port}`));




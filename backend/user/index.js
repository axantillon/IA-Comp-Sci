const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userAuthCheck = require('./auth/userAuthCheck')

const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(userAuthCheck)

const items = require('./routes/api/items');
const archive = require('./routes/api/archive');
const weeks = require('./routes/api/weeks');

app.use('/api/items', items);
app.use('/api/archive', archive);
app.use('/api/weeks', weeks)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port: ${port}`));




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminAuthCheck = require('./auth/adminAuthCheck')

const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(adminAuthCheck)

const items = require('./routes/api/items');
const archive = require('./routes/api/archive');
const weeks = require('./routes/api/weeks');

app.use('/api/items', items);
app.use('/api/archive', archive);
app.use('/api/weeks', weeks)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on port: ${port}`));




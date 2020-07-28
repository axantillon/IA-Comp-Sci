const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


//  Middleware
app.use(bodyParser.json());
app.use(cors());

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const archive = require('./routes/api/archive')

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/archive', archive)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port: ${port}`));




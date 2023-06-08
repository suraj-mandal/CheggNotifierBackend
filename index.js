const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});




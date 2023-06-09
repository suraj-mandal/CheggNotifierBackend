const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const router = require('./routes');


require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);


app.get('/', (_, res) => {
    const response = {
        msg: 'Simple API for checking if you have questions available in your account or not',
        hostname: os.hostname().toString()
    }
    res.send(response);
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});




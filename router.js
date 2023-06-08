const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const browserObject = require('./browser');
const CheggPageController = require('./pageContoller');


const router = express.Router();

router.post('/status', async (req, res) => {

    console.log(req.body);

    const username = req.body.username || null;
    const password = req.body.password || null;

    if (username && password) {
        try {
            // start the browser instance
            let browserInstance = browserObject.startBrowser();

            // pass the browserInstance to the scraper controller
            const cheggPageController = new CheggPageController(browserInstance,
                process.env.CHEGG_URL, username, password);

            const questionStatus = await cheggPageController.checkForQuestions();

            if (questionStatus === true || questionStatus === false) {
                res.status(StatusCodes.OK).send({ available: questionStatus });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                    error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                });
            }
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
        }

    } else {
        res.status(StatusCodes.BAD_REQUEST).send({
            error: getReasonPhrase(StatusCodes.BAD_REQUEST)
        });
    }


});




module.exports = router;

const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const browserObject = require('./browser');
const CheggPageController = require('./pageContoller');

const CHEGG_URL = "https://expert.chegg.com/qna/authoring/answer";


const router = express.Router();

router.post('/status', async (req, res) => {

    const username = req.body.username || null;
    const password = req.body.password || null;

    if (username && password) {
        try {
            // start the browser instance
            let browserInstance = browserObject.startBrowser();

            // pass the browserInstance to the scraper controller
            const cheggPageController = new CheggPageController(browserInstance,
                CHEGG_URL, username, password);

            const questionStatusObj = await cheggPageController.checkForQuestions();

            const questionStatus = questionStatusObj.status;
            const questionStatusCode = questionStatusObj.code;

            if (questionStatus === true || questionStatus === false) {
                res.status(StatusCodes.OK).send({ available: questionStatus });
            } else if (questionStatusCode === StatusCodes.BAD_REQUEST){
                res.status(StatusCodes.BAD_REQUEST).send({
                    error: getReasonPhrase(StatusCodes.BAD_REQUEST)
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

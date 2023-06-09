const CheggQuestionAvailabilityChecker = require('./pageScraper');


class CheggPageController {

    constructor(browserInstance, url, username, password) {
        this.browserInstance = browserInstance;
        this.url = url;
        this.username = username;
        this.password = password;
    }

    async checkForQuestions() {
        let browser;
        let cheggQuestionChecker = new CheggQuestionAvailabilityChecker(this.url, this.username, this.password);
        try {
            browser = await this.browserInstance;
            const questionFound = await cheggQuestionChecker.isQuestionAvailable(browser);
            if (questionFound) {
                console.log('Question has been found!');
            } else {
                console.log('Question is not found!');
            }
            return { status: questionFound, code: 200};
        } catch (err) {
            console.error(`Could not resolve the browser instance => ${err}`);
            return { status: null,  code: 400 }
        }
    }


}




module.exports = CheggPageController

// Next testing is for invalid login credentials

class CheggQuestionAvailabilityChecker {
    constructor(url, username, password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    async isQuestionAvailable(browserInstance) {
        let page = await browserInstance.newPage();
        console.log(`Navigating to ${this.url}`);
        await page.goto(this.url);

        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // now go to the username section and enter the username
        await page.type('input[name=username]', this.username, { delay: 20 });

        // click on proceed button
        await page.keyboard.press('Enter');

        // wait for network idle
        await page.waitForSelector('input[name=password]', { timeout: 5_000 });

        // go the password section and enter the password
        await page.type('input[name=password]', this.password, { delay: 20 });

        // click on proceed button
        await page.keyboard.press('Enter');

        // wait for network change
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // now need to search for the no question page
        // console.log('Reached question answer page');

        // now find the element after reaching the page
        const questionNotFoundSection = await page.$('div[data-test="no-question"');

        await browserInstance.close();

        return !questionNotFoundSection ? true : false;
    }
}

module.exports = CheggQuestionAvailabilityChecker;

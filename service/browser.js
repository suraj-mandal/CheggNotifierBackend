const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        console.log('Opening the browser...');
        browser = await puppeteer.launch({
            headless: true,
            args: ["--start-maximized", "--no-sandbox"],
            ignoreHTTPSErrors: true,
            defaultViewport: null
        });
    } catch (err) {
        console.error("Could not create a browser instance => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};

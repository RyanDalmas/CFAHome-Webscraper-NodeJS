const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#okta-signin-username';
const PASSWORD_SELECTOR = '#okta-signin-password';
const CTA_SELECTOR = '#okta-signin-submit';

async function startBrowser() {
  const browser = await puppeteer.launch({ executablePath: 'chromium-browser' });
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation();
  await page.screenshot({path: 'cfa_1.png'});
}

(async () => {
  await playTest("https://www.cfahome.com/analytics/saw.dll?Dashboard&portalPath=%2fshared%2fRestaurants%2f_portal%2fSales%20Analytics");
  process.exit(1);
})();

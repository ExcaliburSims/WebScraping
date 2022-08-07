const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
	await page.goto('https://thepostrdc.net/category/politique/');
	const movies= await page.evaluate(() => {
		let elements = document.querySelectorAll('.row .tablet_full_width');
		return elements;
	})
	console.log(movies);
	await browser.close();
})();

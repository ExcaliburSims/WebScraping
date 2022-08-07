const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');
	const movies= await page.evaluate(() => {
		let elements = document.querySelectorAll('.row .tablet_full_width');
		return elements;
	})
	await page.screenshot({path: 'example.png'});

  await browser.close();
	//console.log(movies);
	//await browser.close();
})();

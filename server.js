const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');
	const movies= await page.evaluate(() => {
		let elements = document.querySelectorAll('.row .tablet_full_width');
		return elements;
	})
	await page.screenshot({ path: 'example.png' });
	//const names = ['red', 'green', 'yellow'];
	const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
  })
	await fs.writeFile("names.txt", names.join("\r\n"))
	//console.log(movies);
	await browser.close();
})();

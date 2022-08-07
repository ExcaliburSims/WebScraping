const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
	await page.goto('https://learnwebcode.github.io/practice-requests/');
	//Screenshoot
	await page.screenshot({ path: 'example.png' });
	//const names = ['red', 'green', 'yellow'];

	//Create file text and recover name of animal
	const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
  })
	await fs.writeFile("names.txt", names.join("\r\n"))

	//recover pic to web site
	const photos = await page.$$eval("img", imgs => {
    return imgs.map(x => x.src)
	})
	for (const photo of photos) {
    const imagepage = await page.goto(photo)
    await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
  }
	
	await browser.close();
})();

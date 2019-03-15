const puppeteer = require('puppeteer')
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('woorden.txt')
});

const words = [];
const pages = [];

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  words.push(line);
});


(async () => {
    const browser = await puppeteer.launch({ headless: false })
    //page = await browser.newPage()
	
	words.forEach(async function(word) {
		console.log('Line from file:', word)
		const page = await browser.newPage()
		await page.goto(`https://www.uitmuntend.de/search.html?search=${word}`)
	})
	
    //   await browser.close()
})()
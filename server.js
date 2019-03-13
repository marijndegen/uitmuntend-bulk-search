const puppeteer = require('puppeteer')
const stdin = process.stdin;
let page;

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()

    page.on('console', msg => {
        for (let i = 0; i < msg.args.length; ++i)
            console.log(`${i}: ${msg.args[i]}`);
    });

    function print(string) {
        page.evaluate(() => console.log(string));
    }

    const navigationPromise = page.waitForNavigation()

    //Insertions from now on we can use jquery
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' })


    await page.goto('https://www.nedercom.nl/appl/')

    await page.setViewport({ width: 1366, height: 768 })

    await page.waitForSelector('#content_body > .main_row > .content > form > .note:nth-child(2)')
    await page.click('#content_body > .main_row > .content > form > .note:nth-child(2)')

    await page.waitForSelector('.content > form > .row > .value > #schoolid')
    await page.click('.content > form > .row > .value > #schoolid')

    await page.select('.content > form > .row > .value > #schoolid', '23')

    await page.waitForSelector('.content > form > .row > .value > #schoolid')
    await page.click('.content > form > .row > .value > #schoolid')

    await page.waitForSelector('#content > #content_body > .main_row > .content > form')
    await page.click('#content > #content_body > .main_row > .content > form')

    await page.waitForSelector('.content > form > .row:nth-child(3) > .value > .text')
    await page.click('.content > form > .row:nth-child(3) > .value > .text')

    await page.type('.content > form > .row:nth-child(3) > .value > .text', 'brouwer')

    await page.type('#content_body > div.main_row.highlighted_block > div.content.login_block > form > div:nth-child(5) > div > input', '350450')

    //loginknop waarschijnlijk?
    await page.waitForSelector('.main_row > .content > form > .button_holder > #continueItem')
    await page.click('.main_row > .content > form > .button_holder > #continueItem')

    await navigationPromise

    async function readCommands() {
        // await page.evaluate(() => console.log("doing things"))
        print("doing things")
    }

    //DIt hiero werkt niet
    do {
        await readCommands()
        new Promise(resolve => setTimeout(resolve, 5000))
    } while (true)

    //TODO simpele console log in de brouwser werkt niet, fixen

    /*
      terminal applicatie maken die user commands kan interpreteren
      zodat de gebruiker een oefening kan selecteren in de brouwser 
      en vervolgens de vragen kan invullen
      */



    // const bodyHandle = await page.$('body');
    // const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    // await bodyHandle.dispose();

    //   await new Promise(resolve => {
    //       while(document.continueMyHax === false){

    //       }
    //   })

    //   await browser.close()
})()
const puppeteer = require('puppeteer')
const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')

let url = 'https://www.semanticscholar.org/paper/272c82358f9b6e5dea24e5e513aa52547be39e2e'

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('.figure-list__figure-image');
  let images = await page.$$eval('.figure-list__figure-image', (els) => {
    return els.map((el) => {
      return el.getAttribute('src')
    })
  })

  for (let image of images) {
    let fileName = _.last(image.split('/'))
    const res = await axios.get(image, {responseType: 'arraybuffer'})
    fs.writeFileSync(`./images/${fileName}`, new Buffer.from(res.data), 'binary')
  }
  console.log(images)
  await browser.close();
}
main()
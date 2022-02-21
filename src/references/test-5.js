const puppeteer = require('puppeteer')
const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')

let items = require('./references.json')

let done = require('./references-2.json')
let doneKeys = done.map(i => i.key)

items = items
let newItems = done

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  for (let i = 0; i < items.length; i++) {
    console.log(`${i} / ${items.length}`)
    let item = items[i]
    if (doneKeys.includes(item.key)) continue
    if (!item.paperUrl) continue
    let newItem = await get(page, item)
    console.log(newItem)
    if (!newItem) break
    console.log(newItem)
    newItems.push(newItem)
    fs.writeFileSync('./references-2.json', JSON.stringify(newItems, null, 2))
    let random = _.random(5000, 10000)
    console.log(`wait for ${random/1000} seconds`)
    await page.waitForTimeout(random)
  }
  await browser.close();
}

async function get(page, item) {
  try {
    let url = item.paperUrl
    await page.goto(url)
    // await page.waitForSelector('.figure-list__figure-image')
    let images = await page.$$eval('.figure-list__figure-image', (els) => {
      return els.map((el) => {
        return el.getAttribute('src')
      })
    })
    for (let image of images) {
      let fileName = _.last(image.split('/'))
      const res = await axios.get(image, {responseType: 'arraybuffer'})
      fs.writeFileSync(`./images/${item.key}-${fileName}`, new Buffer.from(res.data), 'binary')
    }
    item.images = images
    return item
  } catch (err) {
    console.log(err)
    return false
  }
}


main()

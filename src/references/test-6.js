const puppeteer = require('puppeteer')
const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')

let items = require('./references-2.json')

let done = require('./references-3.json')
let doneKeys = done.map(i => i.key)

items = items
let newItems = done

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  for (let i = 0; i < items.length; i++) {
    console.log(`${i} / ${items.length}`)
    let item = items[i]
    console.log(item.paperUrl)
    if (doneKeys.includes(item.key)) continue
    if (!item.paperUrl) continue
    let newItem = await get(page, item)
    if (!newItem) {
      newItems.push(item)
      continue
    }
    newItems.push(newItem)
    fs.writeFileSync('./references-3.json', JSON.stringify(newItems, null, 2))
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
    let links = await page.$$eval('.icon-button.flex-paper-actions__button.alternate-sources__dropdown-button', (els) => {
      return els.map((el) => {
        return el.getAttribute('href')
      })
    })
    if (links[0]) {
      item.pdf = links[0]
      const res = await axios.get(item.pdf, {responseType: 'arraybuffer'})
      if (res.status === 200) {
        fs.writeFileSync(`./pdf/${item.key}.pdf`, new Buffer.from(res.data), 'binary')
      }
    } else {
      item.pdf = null
    }
    console.log(links)
    return item
  } catch (err) {
    console.log(err)
    return false
  }
}


main()

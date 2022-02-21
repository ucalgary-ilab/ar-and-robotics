
const webdriver = require('selenium-webdriver')
const { Builder } = webdriver
const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')

const capabilities = webdriver.Capabilities.chrome()
capabilities.set('chromeOptions', {
  args: [
    '--headless',
    '--no-sandbox',
    '--window-size=1980,1200'
  ]
})

let url = 'https://www.semanticscholar.org/paper/272c82358f9b6e5dea24e5e513aa52547be39e2e'

async function main() {
  const driver = await new Builder().withCapabilities(capabilities).build()
  await driver.get(url)
  let elements = await driver.findElements({ css: '.figure-list__figure-image' })

  let images = []
  for (let element of elements) {
    let image = await element.getAttribute('src')
    images.push(image)
    let fileName = _.last(image.split('/'))
    const res = await axios.get(image, {responseType: 'arraybuffer'})
    fs.writeFileSync(`./images/${fileName}`, new Buffer.from(res.data), 'binary')
  }
  console.log(images)
  await driver.quit()
}

main()
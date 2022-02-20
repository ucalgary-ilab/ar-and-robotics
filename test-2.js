const fs = require('fs')
const axios = require('axios')
let items = require('./references.json')

let done = require('./references-2.json')
let doneKeys = done.map(i => i.key)

items = items.slice(0, 1)
let newItems = done

async function main() {
  for (let item of items) {
    if (doneKeys.includes(item.key)) continue
    let newItem = await get(item)
    if (!newItem) break
    console.log(newItem)
    newItems.push(newItem)
    fs.writeFileSync('./references-2.json', JSON.stringify(newItems, null, 2))
  }
}

async function get(item) {
  try {
    let url = item.paperUrl
    url = encodeURI(url)
    const res = await axios.get(url)
    console.log(res.data)
    fs.writeFileSync('res.html', res.data)
    // const body = res.data
    // if (body.data.length > 0) {
    //   item.doi = body.data[0].externalIds.DOI
    //   item.dblp = body.data[0].externalIds.DBLP
    //   item.paperId = body.data[0].paperId
    //   item.paperTitle = body.data[0].title
    //   item.paperUrl = body.data[0].url
    // }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}

main()
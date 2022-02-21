const fs = require('fs')
const BibtexParser = require('bib2json')
const _ = require('lodash')
const capitalize = require('title-capitalization')


const tex = fs.readFileSync('./appendix.tex', 'utf8')
let citations = tex.match(/\\cite\{(.*?)\}/g)
let keys = []
for (let citation of citations) {
  citation = citation.replaceAll('\\cite{', '')
  citation = citation.replaceAll('}', '')
  citation = citation.replaceAll(' ', '')
  let array = citation.split(',')
  keys = keys.concat(array)
}

keys = _.uniq(keys)
fs.writeFileSync('./keys.json', JSON.stringify(keys, null, 2))


const bib = fs.readFileSync('./references.bib', 'utf8')
let entries = BibtexParser(bib).entries

let items = []
for (let entry of entries) {
  let item = {}
  item.type = entry.EntryType
  item.key = entry.EntryKey
  if (!keys.includes(item.key)) continue
  for (let key of Object.keys(entry.Fields)) {
    item[key] = entry.Fields[key]
  }
  item.title = capitalize(item.title)
  item.authors = []
  if (entry.Fields.author) {
    let authorItems = entry.Fields.author.split(' and ')
    for (let a of authorItems) {
      let lastName = a.split(', ')[0]
      let firstName = a.split(', ')[1]
      item.authors.push(`${firstName} ${lastName}`)
    }
  }
  items.push(item)
}

fs.writeFileSync('./bib.json', JSON.stringify(items, null, 2))




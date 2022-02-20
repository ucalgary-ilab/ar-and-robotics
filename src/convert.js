const fs = require('fs')
const BibtexParser = require('bib2json')

const bib = fs.readFileSync('./references.bib', 'utf8')
let json = BibtexParser(bib).entries

fs.writeFileSync('./bib.json', JSON.stringify(json, null, 2))

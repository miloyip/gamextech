const fs = require('fs')
const path = require('path')
const i18nList = JSON.parse(fs.readFileSync('i18n.json'), 'utf-8')

const defaultLang = 'en'
const addLang = process.argv[2]

if (addLang in i18nList) {
  console.error('lang has aleady exist!!!')
  process.exit()
}

function getDefaultDir (filename) {
  return `src/${defaultLang}/${filename}`
}

function readJson (filename) {
  const src = fs.readFileSync(filename, 'utf8')
  return JSON.parse(src)
}

function toDstLangFile (filename) {
  const dstFileName = `src/${addLang}/${filename}`
  const dstDir = path.dirname(dstFileName)
  if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir)
  const src = fs.readFileSync(getDefaultDir(filename), 'utf-8')
  fs.writeFile(dstFileName, src, (err) => {
    if (err) throw err
  })
}

readJson('database.json').map(item => toDstLangFile(item))
i18nList[addLang] = ''
fs.writeFileSync('i18n.json', JSON.stringify(i18nList, null, 2))

console.log(`please translate en to ${addLang}!!!`)

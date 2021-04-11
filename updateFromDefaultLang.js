const fs = require('fs')
const path = require('path')
const i18nList = JSON.parse(fs.readFileSync('i18n.json'), 'utf-8')

const defaultLang = 'en'

function getDefaultDir (filename) {
  return `src/${defaultLang}/${filename}`
}

function readJson (filename) {
  const src = fs.readFileSync(filename, 'utf8')
  return JSON.parse(src)
}

function toDstLangFile (filename, lang) {
  const dstFileName = `src/${lang}/${filename}`
  if (fs.existsSync(dstFileName)) return
  const dstDir = path.dirname(dstFileName)
  if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir)
  const src = fs.readFileSync(getDefaultDir(filename), 'utf-8')
  fs.writeFile(dstFileName, src, (err) => {
    if (err) throw err
    console.log(`update ${filename} to ${lang}`)
  })
}

readJson('database.json').forEach(filename => {
  Object.keys(i18nList).filter(lang => lang !== defaultLang)
    .forEach(lang => {
      toDstLangFile(filename, lang)
    })
})

const fs = require('fs')
const i18nList = JSON.parse(fs.readFileSync('i18n.json'), 'utf-8')

const prettify = (filename) => {
  const src = fs.readFileSync(filename, 'utf8')
  const json = JSON.parse(src)
  const dst = JSON.stringify(json, null, 2)
  if (src !== dst) {
    fs.writeFileSync(filename, dst)
    console.log(`Prettified ${filename}`)
  }
  return json
}

prettify('database.json').forEach(filename => {
  for (const key in i18nList) {
    prettify(`src/${key}/${filename}`)
  }
})

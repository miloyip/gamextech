const fs = require('fs')

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

prettify('database.json').forEach(filename => prettify(filename))

const fs = require('fs')
const chalk = require('chalk')
const validate = require('jsonschema').validate

const graphSchema = JSON.parse(fs.readFileSync('graph.schema.json', 'utf8'))
const databaseSchema = JSON.parse(fs.readFileSync('database.schema.json', 'utf8'))

process.exitCode = 0

const logOk = (s) => console.log(chalk.green(s))
const logErr = (s) => { console.log(chalk.red(s)); process.exitCode = 1 }

// Load and validate database
const database = (() => {
  const filename = 'database.json'
  const database = JSON.parse(fs.readFileSync(filename, 'utf8'))
  const result = validate(database, databaseSchema)
  if (result.valid) { logOk(`Validate ${filename} OK.`) } else { logErr(`Validation ${filename} FAIL: ${result.errors}`) }
  return database
})()

// Terminate if database is invalid
if (process.exitCode !== 0) { process.exit() }

// Load and validate graphs in database
const nodeIds = new Map() // maps node id to filename
const links = new Map() // maps link to filename
database.forEach(filename => {
  const graph = JSON.parse(fs.readFileSync(filename, 'utf8'))
  const result = validate(graph, graphSchema)
  if (result.valid) { logOk(`Validate ${filename} OK.`) } else { logErr(`Validation ${filename} FAIL: ${result.errors}`) }

  // Check if node ID is duplicated
  graph.nodes.forEach(n => {
    if (nodeIds.has(n.id)) { logErr(`Node "${n.id}" is duplicated in ${filename}.`) } else { nodeIds.set(n.id, filename) }
  })

  // Check if links are duplicated
  graph.links.forEach(l => {
    if (links.has(l)) { logErr(`Link "${l}" is duplicated in ${filename}.`) } else { links.set(l, filename) }
  })
})

// Check if node id in links exist
const linkedNodeIds = new Set() // and finding isolated nodes
links.forEach((filename, l) => {
  if (!nodeIds.has(l.source)) { logErr(`Source node "${l.source}" does not exists in a link in ${filename}.`) } else { linkedNodeIds.add(l.source) }

  if (!nodeIds.has(l.target)) { logErr(`Target node "${l.target}" does not exists in a link in ${filename}.`) } else { linkedNodeIds.add(l.target) }
})

nodeIds.forEach((filename, id) => {
  if (!linkedNodeIds.has(id)) { logErr(`Node "${id}" in ${filename} is isolated.`) }
})

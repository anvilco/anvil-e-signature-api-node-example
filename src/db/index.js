const fs = require('fs')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const seedDB = 'src/db/seed.json'
const localDB = 'src/db/local.json'

if (!fs.existsSync(localDB)) {
  console.log('Copying Seed DB....')
  fs.writeFileSync(localDB, fs.readFileSync(seedDB))
}

const adapter = new FileSync(localDB)
const db = low(adapter)

db._.mixin(lodashId)

module.exports = db

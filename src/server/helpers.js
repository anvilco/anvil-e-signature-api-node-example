const pickBy = require('lodash.pickby')
const qs = require('qs')

module.exports = {
  logError (str) {
    const red = '\x1b[41m'
    const reset = '\x1b[0m'
    console.error(`${red}${str}${reset}`)
  },
  buildURL (path, query) {
    query = pickBy(query)
    let queryStr = qs.stringify(query)
    queryStr = queryStr ? `?${queryStr}` : ''
    return queryStr ? `${path}${queryStr}` : path
  },
  getTodayISO () {
    return new Date().toISOString().split('T')[0]
  },
}

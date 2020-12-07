const pickBy = require('lodash.pickby')
const qs = require('qs')

module.exports = {
  buildURL (path, query) {
    query = pickBy(query)
    let queryStr = qs.stringify(query)
    queryStr = queryStr ? `?${queryStr}` : ''
    return queryStr ? `${path}${queryStr}` : path
  },
  getTodayISO () {
    return new Date().toISOString().split('T')[0]
  },
  handleClientErrors (response, statusCode, payload, errors) {
    if (statusCode !== 200) return response.jsonp({ statusCode, error: errors[0] })
    if (payload?.errors) return response.jsonp({ statusCode: payload.errors[0].status, error: payload.errors[0] })
  },
  logError (str) {
    const color = '\x1b[41m'
    const reset = '\x1b[0m'
    console.error(`${color}${str}${reset}`)
  },
  logInfo (str) {
    const color = '\x1b[36m'
    const reset = '\x1b[0m'
    console.info(`${color}${str}${reset}`)
  },
}


module.exports = {
  logError (str) {
    const red = '\x1b[41m'
    const reset = '\x1b[0m'
    console.error(`${red}${str}${reset}`)
  },
}

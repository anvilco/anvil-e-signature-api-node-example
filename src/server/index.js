require('dotenv').config()
const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
const appModulePath = require('app-module-path')
const cors = require('cors')
const { logError } = require('./helpers')
const { apiKey, port: PORT, environment } = require('../config')

appModulePath.addPath(path.join(__dirname, '..', '..', 'src'))

const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json({
  inflate: true,
  limit: '20mb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined,
}))

const router = express.Router()
app.use(routes(router))

app.use(express.static('dist'))
app.use(fallback('index.html', { root: path.join(__dirname, '../../dist') }))

if (!apiKey && environment !== 'test') {
  logError('ANVIL_API_KEY has not been defined. See .env.example at the root of the project')
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀!`))

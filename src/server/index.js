require('dotenv').config()
const path = require('path')
const express = require('express')
const appModulePath = require('app-module-path')
const { logError } = require('./helpers')
const { apiKey } = require('../config')

appModulePath.addPath(path.join(__dirname, '..', '..', 'src'))

const routes = require('./routes')
const app = express()

app.use(express.static('dist'))
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

if (!apiKey && process.env.NODE_ENV !== 'test') {
  logError('ANVIL_API_KEY has not been defined. See .env.example at the root of the project')
}

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀!`))

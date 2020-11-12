
module.exports = {
  apiKey: process.env.ANVIL_API_KEY,
  anvilBaseURL: process.env.ANVIL_BASE_URL || 'https://app.useanvil.com',
  devServerPort: process.env.DEV_SERVER_PORT || 3015,
  port: process.env.PORT || 8080,
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:8080',
  templateCastEID: process.env.TEMPLATE_CAST_EID || 'XnuTZKVZg1Mljsu999od',
  environment: process.env.NODE_ENV || 'development',
}

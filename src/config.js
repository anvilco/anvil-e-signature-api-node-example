
module.exports = {
  apiKey: process.env.ANVIL_API_KEY,
  apiBaseURL: process.env.API_BASE_URL || 'https://app.useanvil.com',
  baseURL: process.env.BASE_URL_FRONTEND || 'https://esign-demo.useanvil.com',
  baseURLBackend: process.env.BASE_URL_BACKEND || 'https://esign-demo.useanvil.com:8080',
  templateCastEID: process.env.TEMPLATE_CAST_EID || 'XnuTZKVZg1Mljsu999od',
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
}

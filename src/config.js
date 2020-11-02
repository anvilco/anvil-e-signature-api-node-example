
module.exports = {
  apiKey: process.env.ANVIL_API_KEY,
  apiBaseURL: process.env.API_BASE_URL || 'https://app.useanvil.com',
  baseURL: process.env.BASE_URL || 'https://esign-demo.useanvil.com',
  templateCastEID: process.env.TEMPLATE_CAST_EID || 'XnuTZKVZg1Mljsu999od',
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
}

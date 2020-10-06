const Anvil = require('@anvilco/anvil')
const { createEtchPacketVars } = require('../apiVariables')
const { buildURL, logError } = require('../helpers')
const { apiKey, apiBaseURL } = require('../../config')

if (!apiKey && process.env.NODE_ENV !== 'test') {
  setTimeout(() => {
    logError('ANVIL_API_KEY has not been defined. See .env.example at the root of the project')
  }, 3000)
}

function buildRoutes (router) {
  router.post('/api/packet/create', async (req, res) => {
    const {
      signerOneName,
      signerOneEmail,
      signerOneType = 'embedded',
      signerOneRedirectURL = 'http://localhost:8080/packet/finish',
      signerOneEnableEmails = false,

      signerTwoName,
      signerTwoEmail,
      signerTwoType = 'embedded',
      signerTwoRedirectURL = 'http://localhost:8080/packet/finish',
      signerTwoEnableEmails = false,

      packetName = 'Sample Form',
    } = req.body

    // Update variables to use fields submitted from form
    createEtchPacketVars.signatureEmailSubject = packetName
    createEtchPacketVars.signers[0].name = signerOneName
    createEtchPacketVars.signers[0].email = signerOneEmail
    createEtchPacketVars.signers[0].signerType = signerOneType
    createEtchPacketVars.signers[0].redirectURL = signerOneRedirectURL
    createEtchPacketVars.signers[0].enableEmails = signerOneEnableEmails
    createEtchPacketVars.data.payloads.templatePdfIrsW4.data.name = signerOneName
    createEtchPacketVars.data.payloads.fileUploadNDA.data.disclosingPartyName = signerOneName
    createEtchPacketVars.data.payloads.fileUploadNDA.data.disclosingPartyEmail = signerOneEmail
    createEtchPacketVars.data.payloads.fileUploadNDA.data.name1 = signerOneName

    // Add second signer if signer two info is inputted
    if (signerTwoName && signerTwoEmail) {
      createEtchPacketVars.signers.push({
        id: 'signer2',
        name: signerTwoName,
        email: signerTwoEmail,
        fields: [
          {
            fileId: 'fileUploadNDA',
            fieldId: 'initials2',
          },
          {
            fileId: 'fileUploadNDA',
            fieldId: 'signature2',
          },
          {
            fileId: 'fileUploadNDA',
            fieldId: 'signatureDate2',
          },
        ],
        signerType: signerTwoType,
        redirectURL: signerTwoRedirectURL,
        enableEmails: signerTwoEnableEmails,
      })
      createEtchPacketVars.data.payloads.fileUploadNDA.data.recipientName = signerTwoName
      createEtchPacketVars.data.payloads.fileUploadNDA.data.recipientEmail = signerTwoEmail
      createEtchPacketVars.data.payloads.fileUploadNDA.data.name2 = signerTwoName
    }

    try {
      const client = new Anvil({
        apiKey,
        baseURL: apiBaseURL,
      })

      const { statusCode, data, errors } = await client.createEtchPacket({ variables: createEtchPacketVars })

      // Node-anvil to Anvil server communication errors
      if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })
      // Packet creation errors
      if (data.errors) return res.jsonp({ statusCode: data.errors[0].status, error: data.errors[0] })

      return res.jsonp({ statusCode, data })
    } catch (e) {
      if (e.message === 'apiKey or accessToken required') {
        return res.jsonp({ statusCode: 403, error: { message: 'API key required. Please create an Anvil account and enter your API Key into your `.env` file following the format of `.env.example`. More details can also be found in the README.' } })
      }

      // Anvil server related errors
      return res.jsonp({ statusCode: 504, error: e })
    }
  })

  router.post('/api/packet/sign', async (req, res) => {
    const { clientUserId, signerEid } = req.body

    const variables = { clientUserId, signerEid }

    try {
      const client = new Anvil({
        apiKey,
        baseURL: apiBaseURL,
      })

      const { statusCode, url, errors } = await client.generateEtchSignUrl({ variables })

      // Node-anvil to Anvil server communication errors
      if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })
      // URL generation errors
      if (url.errors) return res.jsonp({ statusCode: url.errors[0].status, error: url.errors[0] })

      return res.jsonp({ statusCode, url })
    } catch (e) {
      if (e.message === 'apiKey or accessToken required') {
        return res.jsonp({ statusCode: 403, error: { message: 'API key required. Please create a `.env` file following `.env.example` and enter in your API Key. More details can be found in the README.' } })
      }

      return res.jsonp({ statusCode: 504, error: e })
    }
  })

  router.get('/api/packet/:packetEid', async (req, res) => {
    const variables = {
      eid: req.params.packetEid,
    }

    try {
      const client = new Anvil({
        apiKey,
        baseURL: apiBaseURL,
      })

      const { statusCode, data, errors } = await client.getEtchPacket({ variables })

      // Node-anvil to Anvil server communication errors
      if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })
      // Packet query errors
      if (data.errors) return res.jsonp({ statusCode: data.errors[0].status, error: data.errors[0] })

      return res.jsonp({ statusCode, data })
    } catch (e) {
      if (e.message === 'apiKey or accessToken required') {
        return res.jsonp({ statusCode: 403, error: { message: 'API key required. Please create an Anvil account and enter your API Key into your `.env` file following the format of `.env.example`. More details can also be found in the README.' } })
      }

      // Anvil server related errors
      return res.jsonp({ statusCode: 504, error: e })
    }
  })

  // router.get('/api/packet/download/:documentGroupEid', async (req, res) => {

  // })

  router.get('/packet/finish', async (req, res) => {
    // Redirect with query string
    const baseURL = `http://localhost:3001/embeddedPacket/${req.query.etchPacketEid}`
    const baseURLWithQueryString = buildURL(baseURL, req.query)
    return res.redirect(baseURLWithQueryString)
  })

  return router
}

module.exports = buildRoutes

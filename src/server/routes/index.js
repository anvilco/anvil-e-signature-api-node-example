const Anvil = require('@anvilco/anvil')
const cloneDeep = require('lodash/cloneDeep')
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
    let {
      packetName = 'Sample Signature Packet',

      signerOneName,
      signerOneEmail,
      signerOneType = 'embedded',
      signerOneRedirectURL = 'http://localhost:8080/packet/finish',
      signerOneEnableEmails = false,
      signerOneSignatureMode = 'draw',
      signerOneAcceptEachField = true,

      signerTwoName,
      signerTwoEmail,
      signerTwoType = 'embedded',
      signerTwoRedirectURL = 'http://localhost:8080/packet/finish',
      signerTwoEnableEmails = false,
      signerTwoSignatureMode = 'draw',
      signerTwoAcceptEachField = true,
    } = req.body

    if (req.query.type === 'email') {
      signerOneType = 'email'
      signerTwoType = 'email'
    }

    const variables = cloneDeep(createEtchPacketVars)

    const streamFile = Anvil.prepareGraphQLFile('src/server/static/test-pdf-nda.pdf')
    variables.files[0].file = streamFile

    // Update variables to use fields submitted from form
    variables.signatureEmailSubject = packetName
    variables.signers[0].name = signerOneName
    variables.signers[0].email = signerOneEmail
    variables.signers[0].signatureMode = signerOneSignatureMode
    variables.signers[0].acceptEachField = signerOneAcceptEachField
    variables.signers[0].signerType = signerOneType
    variables.signers[0].redirectURL = signerOneRedirectURL
    variables.signers[0].enableEmails = signerOneEnableEmails
    variables.data.payloads.templatePdfIrsW4.data.name = signerOneName
    variables.data.payloads.fileUploadNDA.data.disclosingPartyName = signerOneName
    variables.data.payloads.fileUploadNDA.data.disclosingPartyEmail = signerOneEmail
    variables.data.payloads.fileUploadNDA.data.name1 = signerOneName

    // Add second signer if signer two info is inputted
    if (signerTwoName && signerTwoEmail) {
      variables.signers.push({
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
        signatureMode: signerTwoSignatureMode,
        acceptEachField: signerTwoAcceptEachField,
        signerType: signerTwoType,
        redirectURL: signerTwoRedirectURL,
        enableEmails: signerTwoEnableEmails,
      })
      variables.data.payloads.fileUploadNDA.data.recipientName = signerTwoName
      variables.data.payloads.fileUploadNDA.data.recipientEmail = signerTwoEmail
      variables.data.payloads.fileUploadNDA.data.name2 = signerTwoName
    }

    try {
      const client = new Anvil({
        apiKey,
        baseURL: apiBaseURL,
      })

      const { statusCode, data, errors } = await client.createEtchPacket({ variables })

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
    const variables = req.body
    const client = new Anvil({
      apiKey,
      baseURL: apiBaseURL,
    })

    const { statusCode, url, errors } = await client.generateEtchSignUrl({ variables })

    if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })
    // URL generation errors
    if (url.errors) return res.jsonp({ statusCode: url.errors[0].status, error: url.errors[0] })

    return res.jsonp({ statusCode, url })
  })

  router.get('/api/packet/:packetEid', async (req, res) => {
    const variables = {
      eid: req.params.packetEid,
    }
    const client = new Anvil({
      apiKey,
      baseURL: apiBaseURL,
    })

    const { statusCode, data, errors } = await client.getEtchPacket({ variables })

    if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })
    // Packet query errors
    if (data.errors) return res.jsonp({ statusCode: data.errors[0].status, error: data.errors[0] })

    return res.jsonp({ statusCode, data })
  })

  router.get('/api/packet/download/:documentGroupEid', async (req, res) => {
    const client = new Anvil({
      apiKey,
      baseURL: apiBaseURL,
    })

    const { response, statusCode, data, errors } = await client.downloadDocuments(req.params.documentGroupEid)
    if (statusCode !== 200) return res.jsonp({ statusCode, error: errors[0] })

    res.header('Content-Disposition', response.headers.get('content-disposition'))
    return data.pipe(res)
  })

  router.get('/packet/finish', async (req, res) => {
    // Redirect with query string
    const baseURL = `http://localhost:3001/packet/${req.query.etchPacketEid}`
    const baseURLWithQueryString = buildURL(baseURL, req.query)
    return res.redirect(baseURLWithQueryString)
  })

  return router
}

module.exports = buildRoutes

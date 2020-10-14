const Anvil = require('@anvilco/anvil')
const cloneDeep = require('lodash/cloneDeep')
const { createEtchPacketVars } = require('../apiVariables')
const { buildURL, handleClientErrors } = require('../helpers')
const { apiKey, apiBaseURL } = require('../../config')

const client = new Anvil({ apiKey, baseURL: apiBaseURL })

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

    const { statusCode, data, errors } = await client.createEtchPacket({ variables })
    return handleClientErrors(res, statusCode, data, errors) || res.jsonp({ statusCode, data })
  })

  router.post('/api/packet/sign', async (req, res) => {
    const { statusCode, url, errors } = await client.generateEtchSignUrl({ variables: req.body })
    return handleClientErrors(res, statusCode, url, errors) || res.jsonp({ statusCode, url })
  })

  router.get('/api/packet/:packetEid', async (req, res) => {
    const { statusCode, data, errors } = await client.getEtchPacket({
      variables: {
        eid: req.params.packetEid,
      },
    })
    return handleClientErrors(res, statusCode, data, errors) || res.jsonp({ statusCode, data })
  })

  router.get('/api/packet/download/:documentGroupEid', async (req, res) => {
    const { response, statusCode, data, errors } = await client.downloadDocuments(req.params.documentGroupEid)
    res.header('Content-Disposition', response.headers.get('content-disposition'))
    return handleClientErrors(res, statusCode, data, errors) || data.pipe(res)
  })

  router.get('/packet/finish', async (req, res) => {
    // Redirect along with query string
    const baseURL = `http://localhost:3001/packet/${req.query.etchPacketEid}`
    const baseURLWithQueryString = buildURL(baseURL, req.query)
    return res.redirect(baseURLWithQueryString)
  })

  return router
}

module.exports = buildRoutes

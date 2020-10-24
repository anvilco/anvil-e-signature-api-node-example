const qs = require('qs')
const Anvil = require('@anvilco/anvil')
const cloneDeep = require('lodash.clonedeep')
const { createEtchPacketVars } = require('../apiVariables')
const { apiKey, apiBaseURL } = require('../../config')
const { buildURL, handleClientErrors, logInfo } = require('../helpers')

// Initialize Node-anvil client
const client = new Anvil({
  apiKey,
  baseURL: apiBaseURL,
})

function buildRoutes (router) {
  router.post('/api/packet/create', async (req, res) => {
    // Collect user information and preferences submitted from form
    let {
      packetName = 'Sample Signature Packet',

      signerOneName,
      signerOneEmail,
      signerOneType = 'embedded',
      signerOneRedirectURL = 'http://localhost:8080/packet/finish', // see the /packet/finish route below
      signerOneSignatureMode = 'draw',
      signerOneAcceptEachField = true,
      signerOneEnableEmails = false,

      signerTwoName,
      signerTwoEmail,
      signerTwoType = 'embedded',
      signerTwoRedirectURL = 'http://localhost:8080/packet/finish', // see the /packet/finish route below
      signerTwoSignatureMode = 'draw',
      signerTwoAcceptEachField = true,
      signerTwoEnableEmails = false,
    } = req.body

    // Modify signer type config depending on query params
    if (req.query.type === 'email') {
      signerOneType = 'email'
      signerTwoType = 'email'
    }

    // Use the predefined createEtchPacket config variables on how documents should be filled
    const variables = cloneDeep(createEtchPacketVars)

    // Prepare NDA PDF to be used as file 1 in signature packet
    variables.files[0].file = Anvil.prepareGraphQLFile('src/server/static/test-pdf-nda.pdf')

    // Update config variables to use fields submitted from form
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

    logRouteInfo(`Creating packet for name ${packetName}`)
    logJSON(variables)

    // Use the Node-anvil client to create a signature packet
    const { statusCode, data, errors } = await client.createEtchPacket({ variables })
    return handleClientErrors(res, statusCode, data, errors) || res.jsonp({ statusCode, data })
  })

  // For an embedded signer, the sign button will hit this route. We will
  // generate a special signature URL with a token, then redirect the signer to
  // the genenerated URL.
  // See https://www.useanvil.com/docs/api/e-signatures#controlling-the-signature-process-with-embedded-signers
  router.post('/api/packet/sign', async (req, res) => {
    const { statusCode, url, errors } = await client.generateEtchSignUrl({ variables: req.body })

    logRouteInfo('Creating signer URL for embedded signer')
    logJSON(req.body)
    console.log('Generated URL:', url)

    return handleClientErrors(res, statusCode, url, errors) || res.jsonp({ statusCode, url })
  })

  // You can specifiy a finish URL for each signer. After they are done signing,
  // the signer will be directed to the specified URL by the browser.
  router.get('/packet/finish', async (req, res) => {
    logRouteInfo('Signer finished! Query params supplied to redirectURL')
    logJSON(qs.parse(req.query))

    const baseURL = `http://localhost:3001/packet/${req.query.etchPacketEid}`
    const baseURLWithQueryString = buildURL(baseURL, req.query)
    return res.redirect(baseURLWithQueryString)
  })

  // The packet details page uses this to display packet information
  router.get('/api/packet/:packetEid', async (req, res) => {
    // Use the Node-anvil client to get the status and details of a specific signature packet
    const { statusCode, data, errors } = await client.getEtchPacket({
      variables: {
        eid: req.params.packetEid,
      },
    })
    return handleClientErrors(res, statusCode, data, errors) || res.jsonp({ statusCode, data })
  })

  //  You must either save the documents from to your own object store (see
  //  etchPacketComplete webhook), or you // can proxy the download for the user
  //  as we are doing here. Anvil does not // provide an API-accessible download
  //  URL for an end user.
  router.get('/api/packet/download/:documentGroupEid', async (req, res) => {
    // Use the Node-anvil client to ownload the documents in stream or buffer format
    const { statusCode, response, data, errors } = await client.downloadDocuments(req.params.documentGroupEid, {
      dataType: 'stream',
    })
    if (statusCode >= 300) return handleClientErrors(res, statusCode, data, errors)

    res.header('Content-Disposition', response.headers.get('content-disposition'))
    return data.pipe(res)
  })

  return router
}

function logRouteInfo (str) {
  console.log()
  logInfo(str)
}

function logJSON (obj) {
  console.log(JSON.stringify(obj, null, 2))
}

module.exports = buildRoutes

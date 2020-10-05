const Anvil = require('@anvilco/anvil')
const { buildURL, logError } = require('../helpers')
const { apiKey, apiBaseURL, templateCastEID } = require('../../config')

if (!apiKey) {
  setTimeout(() => {
    logError('ANVIL_API_KEY has not been defined. See .env.example at the root of the project')
  }, 3000)
}

function buildRoutes (router) {
  router.get('/packet/finish', async (req, res) => {
    // Redirect with query string
    const baseURL = `http://localhost:3001/embeddedPacket/${req.query.etchPacketEid}`
    const baseURLWithQueryString = buildURL(baseURL, req.query)
    return res.redirect(baseURLWithQueryString)
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

    const streamFile = Anvil.prepareGraphQLFile('src/client/static/testPDF.pdf')

    const variables = {
      isDraft: false,
      isTest: false,
      signatureEmailSubject: packetName,
      signers: [
        {
          id: '1',
          name: signerOneName,
          email: signerOneEmail,
          fields: [
            {
              fileId: 'rootCastUSPS1583',
              fieldId: 'sigAuth',
            },
            {
              fileId: 'fileUpload',
              fieldId: 'signer1Signature',
            },
            {
              fileId: 'fileUpload',
              fieldId: 'signer1Date',
            },
          ],
          signerType: signerOneType,
          redirectURL: signerOneRedirectURL,
          enableEmails: signerOneEnableEmails,
        },
      ],
      data: {
        payloads: {
          rootCastUSPS1583: {
            textColor: '#3D4849',
            data: {
              eid2: 'happy days',
            },
          },
          fileUpload: {
            textColor: '#231F20',
            data: {
              customShortText: 'lorem ipsum',
            },
          },
        },
      },
      files: [
        {
          id: 'rootCastUSPS1583',
          castEid: templateCastEID,
        },
        {
          id: 'fileUpload',
          title: 'Simple Anvil Finovate Form',
          file: streamFile,
          fields: [
            {
              id: 'customShortText',
              type: 'shortText',
              pageNum: 0,
              rect: {
                x: 350,
                y: 500,
                width: 100,
                height: 30,
              },
            },
            {
              id: 'signer1Signature',
              type: 'signature',
              pageNum: 1,
              name: 'Signer 1 Signature',
              rect: {
                x: 100,
                y: 300,
                width: 100,
                height: 30,
              },
            },
            {
              id: 'signer1Date',
              type: 'signatureDate',
              pageNum: 1,
              name: 'Signer 1 Date',
              rect: {
                x: 200,
                y: 300,
                width: 100,
                height: 30,
              },
            },
            {
              id: 'signer2Initials',
              type: 'initial',
              pageNum: 2,
              name: 'Signer 2 Initials',
              rect: {
                x: 300,
                y: 300,
                width: 100,
                height: 30,
              },
            },
          ],
        },
      ],
    }

    if (signerTwoName && signerTwoEmail) {
      variables.signers.push({
        id: '2',
        name: signerTwoName,
        email: signerTwoEmail,
        fields: [
          {
            fileId: 'rootCastUSPS1583',
            fieldId: 'initialApplicant',
          },
          {
            fileId: 'fileUpload',
            fieldId: 'signer2Initials',
          },
        ],
        signerType: signerTwoType,
        redirectURL: signerTwoRedirectURL,
        enableEmails: signerTwoEnableEmails,
      })
    }

    try {
      const client = new Anvil({
        apiKey,
        baseURL: apiBaseURL,
      })

      const { statusCode, data, errors } = await client.createEtchPacket({ variables })

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

  return router
}

module.exports = buildRoutes

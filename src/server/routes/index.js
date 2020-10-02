const Anvil = require('@anvilco/anvil')
const { logError } = require('../helpers')
const { apiKey, apiBaseURL, templateCastEID } = require('../../config')

if (!apiKey) {
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
      signerOneRedirectURL = 'http://localhost:3001/finish',
      signerOneEnableEmails = false,

      signerTwoName,
      signerTwoEmail,
      signerTwoType = 'embedded',
      signerTwoRedirectURL = 'http://localhost:3001/finish',
      signerTwoEnableEmails = false,

      packetName = 'Sample Form',
    } = req.body

    const streamFile = Anvil.prepareGraphQLFile('src/server/static/test-pdf-nda.pdf')

    const variables = {
      isDraft: false,
      isTest: false,
      signatureEmailSubject: packetName,
      files: [
        {
          id: 'rootCastUSPS1583',
          castEid: templateCastEID,
        },
        {
          id: 'fileUploadNDA',
          title: 'Anvil Demo NDA',
          file: streamFile,
          fields: getUploadedFileFields(),
        },
      ],
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
              fileId: 'fileUploadNDA',
              fieldId: 'initials1',
            },
            {
              fileId: 'fileUploadNDA',
              fieldId: 'signature1',
            },
            {
              fileId: 'fileUploadNDA',
              fieldId: 'signatureDate1',
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
          fileUploadNDA: {
            fontSize: 8,
            textColor: '#0000CC',
            data: {
              effectiveDate: new Date().toISOString().split('T')[0],
              disclosingPartyName: signerOneName,
              disclosingPartyEmail: signerOneEmail,
              recipientName: signerTwoName,
              recipientEmail: signerTwoEmail,
              purposeOfBusiness: 'DEMO!!',
              placeOfGovernance: 'The Land',
              name1: signerOneName,
              name2: signerTwoName,
            },
          },
        },
      },
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

function getUploadedFileFields () {
  return [
    {
      id: 'castd50cf5b0043b11ebb998e5b28fd3ab04',
      name: 'Effective Date',
      rect: { x: 326, y: 91, height: 14, width: 112 },
      type: 'date',
      format: 'MM/DD/YYYY',
      aliasId: 'effectiveDate',
      pageNum: 0,
    },
    {
      id: 'castd7f79280043b11ebb998e5b28fd3ab04',
      name: 'Disclosing Party Name',
      rect: { x: 215, y: 106, height: 13, width: 140 },
      type: 'fullName',
      aliasId: 'disclosingPartyName',
      pageNum: 0,
    },
    {
      id: 'castdaa685e0043b11ebb998e5b28fd3ab04',
      name: 'Disclosing Party Email',
      rect: { x: 360, y: 107, height: 12, width: 166 },
      type: 'email',
      aliasId: 'disclosingPartyEmail',
      pageNum: 0,
    },
    {
      id: 'cast29ef9c90043c11ebb998e5b28fd3ab04',
      name: 'Recipient Name',
      rect: { x: 223, y: 120, height: 11, width: 138 },
      type: 'fullName',
      aliasId: 'recipientName',
      pageNum: 0,
    },
    {
      id: 'cast2bef8b40043c11ebb998e5b28fd3ab04',
      name: 'Recipient Email',
      rect: { x: 367, y: 120, height: 13, width: 157 },
      type: 'email',
      aliasId: 'recipientEmail',
      pageNum: 0,
    },
    {
      id: 'cast2f989610043c11ebb998e5b28fd3ab04',
      name: 'Purpose Of Business',
      rect: { x: 314, y: 155, height: 12, width: 229 },
      type: 'shortText',
      aliasId: 'purposeOfBusiness',
      pageNum: 0,
    },
    {
      id: 'castdfda0bd0043c11ebb998e5b28fd3ab04',
      name: 'Initials 1',
      rect: { x: 106, y: 729, height: 25, width: 60 },
      type: 'initial',
      aliasId: 'initials1',
      pageNum: 0,
    },
    {
      id: 'castee68b340043c11ebb998e5b28fd3ab04',
      name: 'Initials 2',
      rect: { x: 171, y: 729, height: 24, width: 67 },
      type: 'initial',
      aliasId: 'initials2',
      pageNum: 0,
    },
    {
      id: 'cast799a5b40043c11ebb998e5b28fd3ab04',
      name: 'Place Of Gov',
      rect: { x: 237, y: 236, height: 14, width: 112 },
      type: 'shortText',
      aliasId: 'placeOfGovernance',
      pageNum: 1,
    },
    {
      id: 'cast84b18f30043c11ebb998e5b28fd3ab04',
      name: 'Name 1',
      rect: { x: 107, y: 374, height: 22, width: 157 },
      type: 'fullName',
      aliasId: 'name1',
      pageNum: 1,
    },
    {
      id: 'cast8a14a610043c11ebb998e5b28fd3ab04',
      name: 'Signature 1',
      rect: { x: 270, y: 374, height: 22, width: 142 },
      type: 'signature',
      aliasId: 'signature1',
      pageNum: 1,
    },
    {
      id: 'cast91474cd0043c11ebb998e5b28fd3ab04',
      name: 'Signature Date 1',
      rect: { x: 419, y: 374, height: 23, width: 80 },
      type: 'signatureDate',
      aliasId: 'signatureDate1',
      pageNum: 1,
    },
    {
      id: 'cast982284c0043c11ebb998e5b28fd3ab04',
      name: 'Name 2',
      rect: { x: 107, y: 416, height: 22, width: 159 },
      type: 'fullName',
      aliasId: 'name2',
      pageNum: 1,
    },
    {
      id: 'castac3ab6d0043c11ebb998e5b28fd3ab04',
      name: 'Signature 2',
      rect: { x: 272, y: 415, height: 23, width: 138 },
      type: 'signature',
      aliasId: 'signature2',
      pageNum: 1,
    },
    {
      id: 'castb5e75e40043c11ebb998e5b28fd3ab04',
      name: 'Signature Date 2',
      rect: { x: 418, y: 414, height: 23, width: 82 },
      type: 'signatureDate',
      aliasId: 'signatureDate2',
      pageNum: 1,
    },
  ]
}

module.exports = buildRoutes

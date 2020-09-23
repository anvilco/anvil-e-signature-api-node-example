const os = require('os')
const db = require('db')
const Anvil = require('@anvilco/anvil')

// LowDB Usage
// https://github.com/typicode/lowdb#how-to-use-id-based-resources

function buildRoutes (router) {
  router.get('/api/username', async (req, res) => {
    return res.send({ username: os.userInfo().username })
  })

  router.get('/api/files', async (req, res) => {
    const files = db.get('files').value()
    return res.send(files)
  })

  router.post('/api/files', async (req, res) => {
    const { description, file } = req.body
    const newFile = db.get('files')
      .insert({
        description,
        filename: file.name,
        mimetype: file.mimetype,
        src: file.base64,
      })
      .write()
    return res.send(newFile)
  })

  router.post('/api/embeddedEtch/create', async (req, res) => {
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

    const client = new Anvil({
      // apiKey: 'JwyVpusgynaxf1uzkbLRhLEVzTLmTByy',
      apiKey: 'kwDwhJ1jIqvxOhcF0imWnBm8GPEoMNif',
      baseURL: 'http://localhost:3000',
    })

    const etchPacketDetails = {
      organizationEid: 'ecAEDDNFe6X3MVgn6cfc',
      send: true,
      isTest: true,
      signatureEmailSubject: packetName,
      signers: [
        {
          id: '1',
          name: signerOneName,
          email: signerOneEmail,
          fields: [
            {
              fileId: 'USPS1583Cast',
              fieldId: 'sigAuth',
            },
          ],
          signerType: signerOneType,
          redirectURL: signerOneRedirectURL,
          enableEmails: signerOneEnableEmails,
        },
      ],
      data: {
        payloads: {
          USPS1583Cast: {
            textColor: '#3D4849',
            data: {
              myOwnText: 'happy days',
            },
          },
        },
      },
      files: [
        {
          id: 'USPS1583Cast',
          castEid: 'ksHsw6s628oMU4Ygjadn',
        },
      ],
    }

    if (signerTwoName && signerTwoEmail) {
      etchPacketDetails.signers.push({
        id: '2',
        name: signerTwoName,
        email: signerTwoEmail,
        fields: [
          {
            fileId: 'USPS1583Cast',
            fieldId: 'sigNotary',
          },
        ],
        signerType: signerTwoType,
        redirectURL: signerTwoRedirectURL,
        enableEmails: signerTwoEnableEmails,
      })
    }

    try {
      const {
        statusCode: packetStatus,
        data: packet,
        errors: packetErrors,
      } = await client.createEtchPacket({ variables: etchPacketDetails })

      if (packetStatus !== 200) return res.jsonp({ statusCode: packetStatus, errors: packetErrors })
      if (packet.errors) return res.jsonp({ statusCode: packet.errors[0].status, errors: packet.errors })

      const etchSignURLDetails = {
        clientUserId: packet?.data?.createEtchPacket?.documentGroup?.eid,
        signerEid: packet?.data?.createEtchPacket?.documentGroup?.signers[0]?.eid,
      }

      const {
        statusCode: signURLStatus,
        url: signURL,
        errors: signURLErrors,
      } = await client.generateEtchSignUrl({ variables: etchSignURLDetails })

      if (signURLStatus !== 200) return res.jsonp({ statusCode: signURLStatus, errors: signURLErrors })
      if (signURL.errors) return res.jsonp({ statusCode: signURL.errors[0].status, errors: signURL.errors })

      return res.jsonp({
        statusCode: signURLStatus,
        data: { url: signURL, packetData: packet },
        errors: signURLErrors,
      })
    } catch (e) {
      return res.jsonp({ statusCode: 504, errors: e })
    }
  })

  // router.post('/api/embeddedEtch/sign', async (req, res) => {
  //   const { documentGroupEid, signerEid } = req.body

  //   const client = new Anvil({
  //     // apiKey: 'JwyVpusgynaxf1uzkbLRhLEVzTLmTByy',
  //     apiKey: 'kwDwhJ1jIqvxOhcF0imWnBm8GPEoMNif',
  //     baseURL: 'http://localhost:3000',
  //   })

  //   const etchSignURLDetails = {
  //     clientUserId: documentGroupEid,
  //     signerEid,
  //   }

  //   try {
  //     const {
  //       statusCode: signURLStatus,
  //       url: signURL,
  //       errors: signURLErrors,
  //     } = await client.generateEtchSignUrl({ variables: etchSignURLDetails })

  //     if (signURLStatus !== 200) return res.jsonp({ statusCode: signURLStatus, errors: signURLErrors })
  //     if (signURL.errors) return res.jsonp({ statusCode: signURL.errors[0].status, errors: signURL.errors })

  //     return res.jsonp({
  //       statusCode: signURLStatus,
  //       data: { url: signURL, packetData: packet },
  //       errors: signURLErrors,
  //     })
  //   } catch (e) {
  //     return res.jsonp({ statusCode: 504, errors: e })
  //   }
  // })

  return router
}

module.exports = buildRoutes

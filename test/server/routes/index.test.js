const { expect } = require('chai')
const db = require('db')
const buildRoutes = require('server/routes')
const buildMockRouter = require('../buildMockRouter')

describe('routes', function () {
  let router, route, res, req
  beforeEach(async function () {
    req = {}
    res = {
      send: (value) => { res.body = value },
    }
    router = buildRoutes(buildMockRouter())
    db.resetToSeed()
  })

  describe('GET /api/files', function () {
    beforeEach(async function () {
      route = '/api/files'
    })

    it('returns all the files', async function () {
      await router.getRoutes[route](req, res)
      expect(res.body).to.have.length(5)
    })
  })

  describe('POST /api/files', function () {
    beforeEach(async function () {
      route = '/api/files'
    })

    it('uploads a file and returns its metadata', async function () {
      const input = {
        description: 'A portait of an artist',
        file: {
          name: 'bobby-tables.jpg',
          mimetype: 'image/jpg',
          base64: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        },
      }
      req.body = input
      await router.postRoutes[route](req, res)
      expect(res.body.id).to.be.ok
      expect(res.body.description).to.equal(input.description)
      expect(res.body.filename).to.equal(input.file.name)
      expect(res.body.mimetype).to.equal(input.file.mimetype)
      expect(res.body.src).to.equal(input.file.base64)
    })
  })
})

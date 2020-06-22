const { expect } = require('chai')
const db = require('db')

describe('db', function () {
  let res, filename
  beforeEach(async function () {
    filename = 'file-name.txt'
    await db.resetToSeed()
  })

  it('writes a file', async function () {
    res = db.get('files')
      .insert({
        filename,
        mimetype: 'text/plain',
        src: 'abc',
      })
      .write()
    expect(res).to.be.ok
  })

  it('resets the db between tests', async function () {
    res = db.get('files')
      .filter((file) => file.filename === filename)
      .value()
    expect(res).to.eql([])
  })
})

const { expect } = require('chai')

describe('Server Tests', function () {
  describe('Dummy test', function () {
    it('expect mocha & sinon to work', function () {
      const testValue = 10
      expect(testValue).to.not.be.null
      expect(testValue).to.equal(10)
    })
  })
})

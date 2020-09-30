import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import App from 'client/App'

describe('Client Tests', function () {
  describe('Dummy test', function () {
    it('expect mocha & enzyme to work', function () {
      const wrapper = shallow(<App />)
      expect(wrapper).to.exist
    })
  })
})

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

describe('Client Tests', function () {
  describe('Dummy test', function () {
    it('expect mocha & enzyme to work', function () {
      const wrapper = shallow(<div />)
      expect(wrapper).to.exist
    })
  })
})

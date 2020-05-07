import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import AllFilesView, { Title } from 'client/routes/AllFiles/AllFilesView'

describe('AllFilesView', function () {
  it('renders the title', function () {
    const wrapper = shallow(
      <AllFilesView
        username="Sally"
        addFile={() => {}}
        files={[]}
      />,
    )

    const title = wrapper.find(Title)
    expect(title).to.have.length(1)
    expect(title.text()).to.equal('Hi Sally 👋')
  })
})

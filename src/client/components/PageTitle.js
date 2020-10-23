import React from 'react'
import PropTypes from 'prop-types'

import { Title, TitleBar } from 'components/styled'
import EtchLogo from 'components/EtchLogo'

const PageTitle = ({ children }) => (
  <TitleBar>
    <Title>{children}</Title>
    <EtchLogo />
  </TitleBar>
)

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageTitle

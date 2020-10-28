import React from 'react'
import PropTypes from 'prop-types'

import { DocURLs } from '../helpers'

const DocsLink = ({ children, href, isCode }) => {
  const link = <a href={DocURLs[href] || href} target="_blank" rel="noreferrer">{children}</a>
  return isCode
    ? <code>{link}</code>
    : link
}

DocsLink.defaultProps = {
  isCode: true,
}

DocsLink.propTypes = {
  children: PropTypes.node.isRequired,
  isCode: PropTypes.bool.isRequired,
  href: PropTypes.string.isRequired,
}

export default DocsLink

import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ fill, ...others }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...others}>
    <g transform="translate(2.000000, 0.000000)" fill={fill} fillRule="nonzero">
      <path d="M8.32,3.96 L11.96,3.96 C12.072,3.96 12.16,3.872 12.16,3.76 C12.16,3.404 12.004,3.068 11.732,2.844 L8.68,0.3 C8.448,0.108 8.16,0.004 7.856,0.004 C7.692,0.004 7.56,0.136 7.56,0.3 L7.56,3.2 C7.56,3.62 7.9,3.96 8.32,3.96 Z" id="Shape" />
      <path d="M6.52,3.2 L6.52,0 L1.28,0 C0.576,0 0,0.576 0,1.28 L0,14.72 C0,15.424 0.576,16 1.28,16 L10.88,16 C11.584,16 12.16,15.424 12.16,14.72 L12.16,5 L8.32,5 C7.328,5 6.52,4.192 6.52,3.2 Z" id="Shape" />
    </g>
  </svg>
)

Icon.defaultProps = {
  fill: 'black',
}

Icon.propTypes = {
  fill: PropTypes.string,
}

export default Icon

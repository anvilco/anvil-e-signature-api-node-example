import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ fill, ...others }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...others}>
    <g id="image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path d="M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,15 C16,15.5522847 15.5522847,16 15,16 L1,16 C0.44771525,16 6.76353751e-17,15.5522847 0,15 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z M4.99997991,9.25 L2,13 L14,13 L10.1428485,8 L7.14286862,11.75 L4.99997991,9.25 Z" id="Combined-Shape" fill={fill} />
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

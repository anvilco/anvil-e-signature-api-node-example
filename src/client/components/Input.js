import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

const StyledInput = styled.input`
  padding: 10px 14px;
  background: white;
  border: 2px solid ${theme.colors.inputBorderColor};
  border-radius: 0;
  font-size: 16px;
`

class Input extends React.Component {
  handleChange = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }

  render () {
    const { value, ...others } = this.props
    return (
      <StyledInput
        {...others}
        value={value || ''}
        onChange={this.handleChange}
      />
    )
  }
}

Input.defaultProps = {
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input

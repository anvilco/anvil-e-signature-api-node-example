import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FieldContainer = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  > input {
    display: block;
    width: 100%;
  }
`

class FormField extends React.Component {
  state = {
    isSubmitting: false,
    values: {},
  }

  render () {
    const { children, value, onChange } = this.props
    const field = React.cloneElement(children[0], { onChange, value })
    return (
      <FieldContainer
        onSubmit={this.handleSubmit}
      >
        {field}
      </FieldContainer>
    )
  }
}

FormField.defaultProps = {
}

FormField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  children: PropTypes.node.isRequired,
}

export default FormField

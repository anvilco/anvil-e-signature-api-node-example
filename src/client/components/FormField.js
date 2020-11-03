import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormLabel } from 'components/styled'

const FieldContainer = styled.div`
  display: inline-block;
  width: ${({ wide }) => (wide) ? '100%' : '50%'};
  padding-right: 10px;
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
    const { children, value, onChange, label, wide } = this.props
    const field = React.cloneElement(children[0], { onChange, value })
    return (
      <FieldContainer
        onSubmit={this.handleSubmit}
        wide={wide}
      >
        <FormLabel>{label}</FormLabel>
        {field}
      </FieldContainer>
    )
  }
}

FormField.defaultProps = {
}

FormField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  wide: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default FormField

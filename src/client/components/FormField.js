import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const LabelContainer = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
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
        <LabelContainer>{label}</LabelContainer>
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
  children: PropTypes.node.isRequired,
}

export default FormField

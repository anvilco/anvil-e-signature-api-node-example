import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: 5px;

  code {
    font-size: 14px;
  }
`

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: block;
  margin: 6px 10px 0 0;
`

const Checkbox = (props) => {
  const { name, children, ...others } = props
  return (
    <Container>
      <StyledCheckbox id={name} name={name} {...others} />
      <label htmlFor={name}>{children}</label>
    </Container>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Checkbox

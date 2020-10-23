import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  line-height: 1.6;
`

const StyledCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  position: relative;
  top: 1px;
  margin: 0 10px 0 0;
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

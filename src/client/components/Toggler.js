import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonToggleContainer = styled.div`
  margin: 20px 0;
`

class Toggler extends Component {
  state = {
    showItem: false,
  }

  handleToggle = () => {
    this.setState({ showItem: !this.state.showItem })
  }

  render () {
    const { renderButton, children } = this.props
    const { showItem } = this.state
    return (
      <>
        <ButtonToggleContainer>
          {renderButton({ showItem, onClick: this.handleToggle })}
        </ButtonToggleContainer>
        {showItem ? children() : null}
      </>
    )
  }
}

Toggler.propTypes = {
  renderButton: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
}

export default Toggler

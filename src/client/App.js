import React, { Component } from 'react'
import './app.css'
import styled from 'styled-components'
import theme from './theme'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.blacks[5]};
`

const StyledTitle = styled.h1`
  color: ${theme.textColor}
`

const StyledExplanationText = styled.span`
  color: ${theme.textColor}
`

class App extends Component {
  state = {
    username: null,
  }

  async componentDidMount () {
    const res = await fetch('/api/getUsername')
    const json = await res.json()
    this.setState({ username: json.username })
  }

  render () {
    const { username } = this.state
    return (
      <StyledContainer>
        {
          username
            ? <StyledTitle>{`Hi ${username} 👋`}</StyledTitle>
            : <StyledTitle>Loading..</StyledTitle>
        }
        <StyledExplanationText>We're excited at the prospect of you joining the team!</StyledExplanationText>
      </StyledContainer>
    )
  }
}

export default App

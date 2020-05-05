import React, { Component } from 'react'
import './app.css'
import ReactImage from './react.png'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: pink;
`

export default class App extends Component {
  state = { username: null };

  componentDidMount () {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }))
  }

  render () {
    const { username } = this.state
    return (
      <StyledContainer>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </StyledContainer>
    )
  }
}

import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import theme from 'theme'

import AllFiles from 'routes/AllFiles'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Sans-Serif;
    background-color: ${theme.colors.blacks[5]};

    * {
      box-sizing: border-box;
    }
  }
`

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 20px;
`

class App extends Component {
  render () {
    return (
      <AppContainer>
        <GlobalStyle />
        <AllFiles />
      </AppContainer>
    )
  }
}

export default App

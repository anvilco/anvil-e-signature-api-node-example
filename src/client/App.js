import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import theme from 'theme'
import Routes from 'routes'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Sans-Serif;
    background-color: ${theme.colors.blacks[5]};
    color: ${theme.textColor};

    a {
      text-decoration: none;
      color: ${theme.colors.blue};

      &:hover,
      &:active,
      &:focus {
        text-decoration: underline;
      }
    }

    * {
      box-sizing: border-box;
    }
  }
`

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 20px;
`

const App = () => {
  return (
    <AppContainer>
      <Routes />
      <GlobalStyle />
    </AppContainer>
  )
}

export default App

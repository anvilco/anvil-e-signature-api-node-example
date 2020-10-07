import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import theme from 'theme'
import Routes from 'routes'

const Layout = styled.div`
  max-width: 600px;
  min-height: 600px;
  margin: 0 auto;
  padding: 50px 20px;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Tahoma;
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

const App = () => {
  return (
    <Layout>
      <Routes />
      <GlobalStyle />
    </Layout>
  )
}

export default App

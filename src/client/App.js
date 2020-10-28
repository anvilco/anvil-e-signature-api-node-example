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
    line-height: 1.6;

    a {
      text-decoration: none;
      color: ${theme.colors.blue};

      &:hover,
      &:active,
      &:focus {
        text-decoration: underline;
      }
    }

    code {
      font-size: 16px;
    }

    * {
      box-sizing: border-box;
    }
  }

  code {
    padding: 2px 5px;
    background: #eee;
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

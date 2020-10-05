import React from 'react'
import { createGlobalStyle } from 'styled-components'

import Content from 'components/Content'
import theme from 'theme'
import Routes from 'routes'

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
    <Content.Card layout>
      <Routes />
      <GlobalStyle />
    </Content.Card>
  )
}

export default App

import React from 'react'

import Menu from './Menu'
import { Description, Footer } from 'components/styled'
import PageTitle from 'components/PageTitle'

const MainPage = () => {
  return (
    <>
      <PageTitle>Anvil Etch E-Sign API Example</PageTitle>
      <Description>
        These examples will create Anvil Signature Packets with multiple PDFs, then allow you go through the signing process.
      </Description>
      <Menu />
      <Footer>
        Check out{' '}
        <a href="https://www.useanvil.com/docs/api/e-signatures" target="_blank" rel="noreferrer">
          the e-signature API docs
        </a>
        {' '}for more information
      </Footer>
    </>
  )
}

MainPage.propTypes = {}

export default MainPage

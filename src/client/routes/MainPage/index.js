import React from 'react'

import Menu from './Menu'
import { Description, Footer } from 'components/styled'
import PageTitle from 'components/PageTitle'
import DocsLink from 'components/DocsLink'

const MainPage = () => {
  return (
    <>
      <PageTitle>Anvil Etch E-Sign API Example</PageTitle>
      <Description>
        <p>
          These examples will create Signature Packets with multiple PDFs, then
          allow you go through the signing process.
        </p>
        <p>
          See this project's <DocsLink href="routesIndex">server/routes/index.js</DocsLink> for the meat of the integration.
        </p>
      </Description>
      <Menu />
      <Footer>
        See{' '}
        <a href="https://www.useanvil.com/docs/api/e-signatures" target="_blank" rel="noreferrer">
          the Etch E-Sign API docs
        </a>
        {' '}for more information
      </Footer>
    </>
  )
}

MainPage.propTypes = {}

export default MainPage

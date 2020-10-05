import React from 'react'

// import Content from 'components/Content'
import Menu from './Menu'
import { Title, TitleBar, Description, Docs } from 'components/styled'
import EtchStamp from 'static/etch-stamp.png'

const MainPage = () => {
  return (
    <>
      <TitleBar>
        <Title>Anvil E-Signatures API Example</Title>
        <img src={EtchStamp} alt="Anvil Etch e-signatures" width={50} height={50} />
      </TitleBar>
      <Description>These examples will create Anvil Signature Packets with multiple PDFs, then allow you go through the signing process.</Description>
      <Menu />
      <Docs>
        Check out{' '}
        <a href="https://www.useanvil.com/docs/api/e-signatures" target="_blank" rel="noreferrer">
          the e-signature API docs
        </a>
        {' '}for more information
      </Docs>
    </>
  )
}

export default MainPage

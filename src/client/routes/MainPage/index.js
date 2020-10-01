import React from 'react'
import styled from 'styled-components'
import Content from 'components/Content'
import IconPlus from 'components/icons/IconPlus'
import theme from 'theme'
import { Title, Description, StyledLink } from 'components/styled'

const NameContainer = styled.div``

const Name = styled.div`
  color: ${theme.colors.black};
  font-weight: bold;
`

const ItemDescription = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${theme.textColors.subtle};
`

const Docs = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: ${theme.textColors.subtle};
  text-align: center;
`

const MainPage = () => {
  return (
    <>
      <Title>Anvil E-Signatures API Example</Title>
      <Description>These examples will create Anvil Signature Packets with multiple PDFs, then allow you go through the signing process.</Description>
      <Content.Card>
        <Content.List
          items={[
            {
              id: 1,
              name: 'Create Email Signature Packet',
              description: 'Anvil controls the signing process by sending an email to each signer',
              to: '/emailPacket/create',
            },
            {
              id: 2,
              name: 'Create Embedded Signature Packet',
              description: 'Your app controls the signing process, no emails are sent from Anvil',
              to: '/embeddedPacket/create',
            },
          ]}
          renderItem={(item, index) => (
            <React.Fragment key={index}>
              <NameContainer>
                <Name as={StyledLink} to={item.to}>
                  {item.name}
                </Name>
                {item.description
                  ? (
                    <ItemDescription>{item.description}</ItemDescription>
                  )
                  : null}
              </NameContainer>
              <Content.List.Actions as={StyledLink} to={item.to}>
                <IconPlus />
              </Content.List.Actions>
            </React.Fragment>
          )}
        />
      </Content.Card>
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

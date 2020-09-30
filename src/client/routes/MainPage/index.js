import React from 'react'
import styled from 'styled-components'
import Content from 'components/Content'
import IconPlus from 'components/icons/IconPlus'
import theme from 'theme'
import { Title, Description, StyledLink } from 'components/styled'

const NameContainer = styled.div``

const Name = styled.div`
  color: ${theme.colors.black};
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
      <Title>Anvil E-Signature API Example</Title>
      <Description>Create a signature packet below</Description>
      <Content.Card>
        <Content.List
          items={[
            {
              id: 1,
              name: 'Embedded signature packet with one signer',
              description: 'You control the signing process for one signer. The signer receive no emails.',
              to: '/embedded/one',
            },
            {
              id: 2,
              name: 'Embedded signature packet with two signers',
              description: 'You control the signing process for two signers. Signers receive no emails.',
              to: '/embedded/two',
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
        <a href="https://www.useanvil.com/docs/api/e-signatures" target="_blank">
          the e-signature API docs
        </a>
        {' '}for more information
      </Docs>
    </>
  )
}

export default MainPage

import React from 'react'
import styled from 'styled-components'
import Content from 'components/Content'
import IconPlus from 'components/icons/IconPlus'
import theme from 'theme'
import { Title, Description, StyledLink } from 'components/styled'

const NameContainer = styled.div``

const Name = styled.div``

const ItemDescription = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${theme.textColors.subtleBlue};
`

const MainPage = () => {
  return (
    <>
      <Title>Anvil Etch Workflows</Title>
      <Description>Paperwork without the paper and work.</Description>
      <Content.Card>
        <Content.List
          items={[
            {
              id: 1,
              name: 'A simple etch signature workflow for one signer',
              description: 'Sign your own documents',
              to: '/oneSignerEmbedded',
            },
            {
              id: 2,
              name: 'An etch signature workflow for two signers',
              description: 'For documents involving two parties',
              to: '/twoSignersEmbedded',
            },
          ]}
          renderItem={(item, index) => (
            <React.Fragment key={index}>
              <NameContainer as={StyledLink} to={item.to}>
                <Name>{item.name}</Name>
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
    </>
  )
}

export default MainPage

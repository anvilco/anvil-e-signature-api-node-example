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
  color: ${theme.colors.greens[80]};
`

const MainPage = () => {
  return (
    <>
      <Title>Anvil Signatures</Title>
      <Description>Paperwork without the paper and work.</Description>
      <Content.Card>
        <Content.List
          items={[
            {
              id: 1,
              name: 'Create an Anvil signature packet for one signer',
              description: 'Sign your own documents',
              to: '/embedded/one',
            },
            {
              id: 2,
              name: 'Create an Anvil signature packet for two signers',
              description: 'Sign yourself, then gather signatures',
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
    </>
  )
}

export default MainPage

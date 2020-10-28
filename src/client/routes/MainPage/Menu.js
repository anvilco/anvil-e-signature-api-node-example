import React from 'react'
import styled from 'styled-components'

import theme from 'theme'
import Content from 'components/Content'
import IconPlus from 'components/icons/IconPlus'
import { StyledLink } from 'components/styled'

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

const Menu = () => (
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
            <ItemDescription>{item.description}</ItemDescription>
          </NameContainer>
          <Content.List.Actions as={StyledLink} to={item.to}>
            <IconPlus />
          </Content.List.Actions>
        </React.Fragment>
      )}
    />
  </Content.Card>
)

Menu.propTypes = {}

export default Menu

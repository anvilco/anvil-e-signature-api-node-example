import styled from 'styled-components'
import { Link } from 'react-router-dom'

import theme from 'theme'

export const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 26px;
`

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Description = styled.h3`
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: normal;
`

export const StyledLink = styled(Link)`
  ${({ size }) => size === 'small' && `
    font-size: 14px;
  `}
`

export const StyledAnchor = styled.a`
  ${({ size }) => size === 'small' && `
    font-size: 14px;
  `}
`

const handleColorType = (color) => {
  switch (color) {
    case 'success':
      return theme.colors.greens[80]
    case 'failure':
      return theme.colors.oranges[70]
    default:
      return theme.colors.blacks[90]
  }
}

export const Response = styled.p`
  color: ${({ color }) => handleColorType(color)};
`

export const Docs = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: ${theme.textColors.subtle};
`

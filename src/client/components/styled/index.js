import styled from 'styled-components'
import { Link } from 'react-router-dom'

import theme from 'theme'

export const Title = styled.h1`
  font-size: 26px;
  margin: 0;
`

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

export const Description = styled.div`
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.6;

  p:last-child {
    margin-bottom: 0;
  }

  code {
    padding: 2px 5px;
    background: #e0e0e0;
  }
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
  ${({ size }) => size === 'large' && `
    font-size: 18px;
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

export const FormLabel = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`
export const Footer = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: ${theme.textColors.subtle};
`

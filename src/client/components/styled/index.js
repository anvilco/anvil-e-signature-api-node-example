import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from 'theme'

export const Title = styled.h1`
  margin-bottom: 15px;
  text-align: center;
`

export const Description = styled.h3`
  margin-bottom: 25px;
  text-align: center;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.greens[80]};
`

export const StyledAnchor = styled.a`
  text-decoration: ${({ link }) => link ? 'underline' : 'none'};
  color: ${({ link }) => link ? theme.colors.oranges[70] : theme.colors.blacks[90]};
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

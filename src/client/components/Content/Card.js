import styled from 'styled-components'
import theme from 'theme'

import { ListContainer } from './List'

const Card = styled.div`
  background: white;
  box-shadow: ${theme.shadows[50]};

  padding: ${theme.paddings[20]}px;
  margin-bottom: ${theme.paddings[20]}px;

  > * {
    &:last-child {
      margin-bottom: 0;
    }
  }

  > ${ListContainer}:first-child {
    margin-top: -20px;
  }

  > ${ListContainer}:last-child {
    margin-bottom: -20px;
  }
`

export default Card

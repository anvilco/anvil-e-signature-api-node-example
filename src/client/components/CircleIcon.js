import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

const sizes = {
  large: { background: 34, icon: 16 },
  medium: { background: 28, icon: parseFloat(448 / 34) },
  small: { background: 20, icon: 10 },
}

const whiteSVG = `
  svg {
    path, circle, rect {
      fill: white;
    }
  }
`

const Container = styled.div`
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;

  font-size: 20px;
  text-align: center;
  font-weight: ${theme.fontWeights.bold};

  background: ${theme.colors.blacks[7]};

  svg {
    display: block;
    path, circle, rect {
      fill: ${theme.colors.blacks[50]};
    }
  }

  ${({ size }) => `
    width: ${sizes[size].background}px;
    height: ${sizes[size].background}px;

    svg {
      display: block;
      width: ${sizes[size].icon}px;
      height: ${sizes[size].icon}px;
    }
  `}

  ${({ type }) => type === 'success' && `
    color: white;
    background: ${theme.colors.green};
    ${whiteSVG}
  `}
`

const CircleIcon = ({ children, size, type }) => (
  <Container size={size} type={type}>
    {children}
  </Container>
)

CircleIcon.defaultProps = {
  size: 'large',
  type: 'default',
}

CircleIcon.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(_.keys(sizes)),
  type: PropTypes.oneOf(['default', 'success']),
}

export default CircleIcon

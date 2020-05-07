import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

const transition = '.3s cubic-bezier(.645,.045,.355,1)'

const buttonVariantSolid = ({
  color,
  colorHover,
  colorDisabled,
  background,
  backgroundHover,
  opacityDisabled,
}) => `
  color: ${color};
  background-color: ${background};
  border-width: 0;
  font-weight: ${theme.fontWeights.bold};
  outline: none;

  padding: 12px 16px;

  transition:
    color ${transition},
    background ${transition},
    width ${transition};

  &:focus {
    color: ${colorHover || color};
    background-color: ${background};
  }

  &:active,
  &:hover {
    color: ${colorHover || color};
    background-color: ${backgroundHover};

  }

  &[disabled],
  &[disabled]:hover,
  &.disabled,
  &.disabled:hover {
    color: ${colorDisabled || color};
    background-color: ${background};
    opacity: ${opacityDisabled || '.5'};
  }
`

const buttonStyles = ({ size, type, toolbar, colorDisabled }) => `
  font-size: ${theme.fontSizes[40]}px;
  border-color: transparent !important;

  ${buttonVariantSolid({
    color: 'white',
    background: theme.colors.blacks[50],
    backgroundHover: theme.colors.blacks[40],
  })};

  ${type === 'cta' && buttonVariantSolid({
    color: theme.colors.blacks[50],
    background: theme.colors.green,
    backgroundHover: theme.colors.greens[40],
  })};

  ${type === 'primary' && buttonVariantSolid({
    color: 'white',
    background: theme.colors.blue,
    backgroundHover: theme.colors.blues[40],
  })};

  ${type === 'danger' && buttonVariantSolid({
    color: theme.colors.reds[80],
    background: theme.colors.red,
    backgroundHover: theme.colors.reds[40],
  })};

  ${type === 'black' && buttonVariantSolid({
    color: 'white',
    background: theme.colors.black[50],
    backgroundHover: theme.colors.blacks[40],
  })};

  ${type === 'default' && toolbar && buttonVariantSolid({
    color: theme.colors.blacks[50],
    colorHover: theme.colors.black,
    background: theme.colors.blacks[7],
    backgroundHover: 'white',
  })};

  ${(type === 'link') && `
    font-weight: inherit;
    line-height: inherit;
    text-align: inherit;
    height: inherit;
    background: none;
    box-shadow: none;
    vertical-align: bottom;

    > * {
      display: inline-block;
      vertical-align: middle;
    }

    border: none;
    padding: 0;

    transition: color 0.1s ease;

    &:active,
    &:focus,
    &:hover {
      background: none;
      svg {
        path, polygon, rect {
          fill: ${theme.colors.textColor};
        }
      }
    }

    &[disabled],
    &[disabled]:hover,
    &.disabled,
    &.disabled:hover {
      background-color: transparent !important;
      line-height: inherit !important;
      opacity: .5;
    }

    font-size: 14px;
    color: ${theme.colors.blue};
    &:active,
    &:focus,
    &:hover {
      color: ${theme.colors.blues[40]};
    }

    &[disabled],
    &[disabled]:hover,
    &.disabled,
    &.disabled:hover {
      color: ${theme.colors.blue} !important;
    }

    svg {
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 14px;
      margin-right: 8px;

      path, polygon, rect {
        transition: fill 0.1s ease;
        fill: ${theme.textColors.subtle};
      }

      &:last-child {
        margin-right: 0;
      }
    }
  `};
`

const ButtonStyled = styled.button`
  ${(props) => buttonStyles(props)}
`

const Button = ({ type, children, isSubmit, className, ...others }) => {
  return (
    <ButtonStyled
      htmlType={isSubmit ? 'submit' : null}
      type={type}
      className={className}
      {...others}
    >
      {children}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  to: null,
  href: null,
  isSubmit: false,
  type: 'default',
}

Button.propTypes = {
  isSubmit: PropTypes.bool,
  type: PropTypes.oneOf(['link', 'primary', 'default', 'cta', 'danger', 'black']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Button

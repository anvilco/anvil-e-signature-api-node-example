import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'

const size = '28px'
const sizeSmall = '18px'
const thickness = '4px'
const thicknessSmall = '2px'
const duration = '1.2s'
const background = rgba('black', 0.1)
const foreground = '#F83877'

const Spinner = styled.div`
  border-top: ${thickness} solid ${background};
  border-right: ${thickness} solid ${background};
  border-bottom: ${thickness} solid ${background};
  border-left: ${thickness} solid ${foreground};
  position: fixed;
  top: 48.5%;
  left: 48.5%;
  transform: translate(-50%, -50%);
  animation: spinSpinner ${duration} infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: ${size};
    height: ${size};
  }

  ${({ block }) => block && `
    display: block;
  `}

  ${({ small }) => small && `
    &,
    &::after {
      width: ${sizeSmall};
      height: ${sizeSmall};
      border-width: ${thicknessSmall};
    }
  `}

  @keyframes spinSpinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

Spinner.defaultProps = {
  small: false,
  block: false,
}

Spinner.propTypes = {
  small: PropTypes.bool,
  block: PropTypes.bool,
}

export default Spinner

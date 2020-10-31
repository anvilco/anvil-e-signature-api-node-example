import styled from 'styled-components'
import { rgba } from 'polished'
import IconDelete from 'components/icons/IconDelete'

const size = '28px'
const sizeSmall = '18px'
const thickness = '4px'
const thicknessSmall = '2px'
const duration = '1.2s'
const background = rgba('black', 0.1)
const foreground = '#F83877'

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d8d8d8;
  background: #fbfbfb;
  z-index: 9999;
`

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.3);
`

export const DeleteIcon = styled(IconDelete)`
  position: fixed;
  top: 10px;
  right: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`

export const Iframe = styled.iframe`
  border-style: none;
`

export const Docs = styled.p`
  margin: 10px 10px 10px 10px;
  font-size: 14px;
  color: #bbb;

  code {
    font-size: 16px;
  }
`

export const Spinner = styled.div`
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

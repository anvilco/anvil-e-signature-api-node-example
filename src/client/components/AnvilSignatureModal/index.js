import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import AnvilSignatureFrame from '../AnvilSignatureFrame'
import DeleteIcon from './components/DeleteIcon'
import './index.css'

class AnvilSignatureModal extends React.Component {
  constructor (props) {
    super(props)
    ReactModal.setAppElement(this.props.modalAppElement)
  }

  render () {
    const {
      signURL, isOpen, onClose, onLoad, onFinish, anvilURL, showDeleteIcon,
      anvilFrameProps, deleteIconProps, ...otherProps
    } = this.props

    return (
      <ReactModal
        ariaHideApp
        shouldFocusAfterRender
        shouldCloseOnEsc
        shouldReturnFocusAfterClose
        shouldCloseOnOverlayClick
        role="e-sign"
        contentLabel="Anvil Signature Modal"
        className="anvil-modal"
        overlayClassName="anvil-overlay"
        portalClassName="anvil-modal-portal"
        bodyOpenClassName="anvil-signature-page-body"
        htmlOpenClassName="anvil-signature-page-html"
        {...otherProps}
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <AnvilSignatureFrame
          {...anvilFrameProps}
          style={null}
          signURL={signURL}
          onLoad={onLoad}
          onFinish={onFinish}
          anvilURL={anvilURL}
        />
        {showDeleteIcon &&
          <DeleteIcon
            className="anvil-delete-icon"
            {...deleteIconProps}
            onClick={onClose}
          />}
      </ReactModal>
    )
  }
}

AnvilSignatureModal.defaultProps = {
  isOpen: false,
  modalAppElement: document.body,
  showDeleteIcon: true,
  anvilFrameProps: { id: 'anvil-signature-modal' },
  deleteIconProps: {},
}

AnvilSignatureModal.propTypes = {
  signURL: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onLoad: PropTypes.func,
  onFinish: PropTypes.func,
  modalAppElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Element),
  ]),
  anvilURL: PropTypes.string,
  showDeleteIcon: PropTypes.bool,
  anvilFrameProps: PropTypes.object,
  deleteIconProps: PropTypes.object,
}

export default AnvilSignatureModal

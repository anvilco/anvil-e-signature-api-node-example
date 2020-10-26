import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DeleteIcon, Docs, Iframe, ModalBackdrop, ModalContainer, Spinner } from './styled'

function AnvilSignatureModal ({ signURL, isOpen, onFinish, width, height }) {
  const [loading, setLoading] = useState(true)

  if (!isOpen) return null
  return (
    <>
      <ModalContainer id="signatureModalContainer">
        {loading && <Spinner id="signatureModalSpinner" />}
        <DeleteIcon
          id="signatureModalClose"
          style={{ position: 'fixed', top: '10px', right: '10px' }}
          onClick={() => onFinish()}
        />
        <Iframe
          id="signatureFrame"
          src={signURL}
          name="Anvil E-Signatures"
          title="Anvil E-Signatures"
          width={width}
          height={height}
          onLoad={() => setLoading(false)}
        >
          <Docs>Your browser does not support iframes.</Docs>
        </Iframe>
      </ModalContainer>
      <ModalBackdrop id="signatureModalBackdrop" />
    </>
  )
}

AnvilSignatureModal.defaultProps = {
  isOpen: false,
  width: 900,
  height: 1100,
}

AnvilSignatureModal.propTypes = {
  signURL: PropTypes.string,
  isOpen: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onFinish: PropTypes.func,
}

export default AnvilSignatureModal

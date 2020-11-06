/* global anvilBaseURL */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { DeleteIcon, Docs, Iframe, ModalBackdrop, ModalContainer, Spinner } from './styled'

function AnvilSignatureFrame ({ signURL, isOpen, onClose, onFinish, width, height }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('message', ({ origin, data: url }) => {
        if (origin !== anvilBaseURL) return
        onFinish(url)
      })
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <>
      <ModalContainer id="signatureModalContainer">
        {loading && <Spinner id="signatureModalSpinner" />}
        <DeleteIcon
          id="signatureModalClose"
          style={{ position: 'fixed', top: '10px', right: '10px' }}
          onClick={() => onClose()}
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

AnvilSignatureFrame.defaultProps = {
  isOpen: false,
  width: 900,
  height: 1100,
  onFinish: (url) => window.location.assign(url),
}

AnvilSignatureFrame.propTypes = {
  signURL: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func,
}

export default AnvilSignatureFrame

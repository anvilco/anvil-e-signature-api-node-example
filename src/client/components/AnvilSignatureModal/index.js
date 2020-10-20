import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'
import IconDelete from 'components/icons/IconDelete'

const AnvilSignatureModal = ({ signURL, show, width, height, onClose, style }) => {
  const [loading, setLoading] = useState(true)

  if (!show) return null
  return (
    <>
      <div
        id="signatureModalContainer"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          background: '#fbfbfb',
          zIndex: '9999',
          ...style,
        }}
      >
        {loading && <Spinner />}
        <IconDelete style={{ position: 'fixed', top: '5px', right: '5px' }} onClick={() => onClose()} />
        <iframe
          src={signURL}
          title="Anvil E-Signatures"
          width={width}
          height={height}
          style={{ borderStyle: 'none' }}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div
        id="signatureModalBackdrop"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0px',
          left: '0px',
          zIndex: '9998',
          background: 'rgba(0, 0, 0, 0.3)',
        }}
      />
    </>
  )
}

AnvilSignatureModal.defaultProps = {
  width: 900,
  height: 1000,
}

AnvilSignatureModal.propTypes = {
  signURL: PropTypes.string,
  show: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClose: PropTypes.func,
  style: PropTypes.object,
}

export default AnvilSignatureModal

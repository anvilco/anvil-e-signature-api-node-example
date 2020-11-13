import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Docs, Iframe } from './styled'

const ANVIL_URLS = ['https://app.useanvil.com', 'https://staging.useanvil.com', 'http://localhost:3000']

function AnvilSignatureFrame ({ signURL, scroll, onLoad, onFinish, width, height }) {
  const myRef = useRef(null)

  useEffect(() => {
    window.addEventListener('message', ({ origin, data: url }) => {
      if (!ANVIL_URLS.includes(origin)) return
      onFinish(url)
    })
    if (scroll) myRef.current.scrollIntoView({ behavior: scroll })
  }, [])

  return (
    <Iframe
      id="signatureFrame"
      src={signURL}
      name="Anvil E-Signatures"
      title="Anvil E-Signatures"
      width={width}
      height={height}
      onLoad={onLoad}
      ref={myRef}
    >
      <Docs>Your browser does not support iframes.</Docs>
    </Iframe>
  )
}

AnvilSignatureFrame.defaultProps = {
  scroll: 'auto',
  onFinish: (url) => window.location.assign(url),
  width: 900,
  height: 1100,
}

AnvilSignatureFrame.propTypes = {
  signURL: PropTypes.string.isRequired,
  scroll: PropTypes.string,
  onLoad: PropTypes.func,
  onFinish: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default AnvilSignatureFrame

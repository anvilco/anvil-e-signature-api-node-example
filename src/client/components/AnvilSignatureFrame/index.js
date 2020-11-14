import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './index.css'

const ANVIL_URLS = ['https://app.useanvil.com', 'https://staging.useanvil.com', 'http://localhost:3000']

function AnvilSignatureFrame ({ signURL, scroll, onLoad, onFinish, width, height }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    function handleSignFinish ({ origin, data: url }) {
      if (!ANVIL_URLS.includes(origin)) return
      onFinish(url)
    }
    window.addEventListener('message', handleSignFinish)
    if (scroll) iframeRef.current.scrollIntoView({ behavior: scroll })
    return () => window.removeEventListener('message', handleSignFinish)
  }, [])

  return (
    <iframe
      id="signatureFrame"
      src={signURL}
      name="Anvil Etch E-Sign"
      title="Anvil Etch E-Sign"
      width={width}
      height={height}
      onLoad={onLoad}
      ref={iframeRef}
    >
      <p className="docs">Your browser does not support iframes.</p>
    </iframe>
  )
}

AnvilSignatureFrame.defaultProps = {
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

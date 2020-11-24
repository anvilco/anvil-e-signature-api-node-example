import React from 'react'
import PropTypes from 'prop-types'

class AnvilSignatureFrame extends React.Component {
  constructor (props) {
    super(props)
    this.iframeRef = React.createRef()
  }

  componentDidMount () {
    const { scroll } = this.props
    window.addEventListener('message', this.handleSignFinish)
    if (scroll) this.iframeRef.current.scrollIntoView({ behavior: scroll })
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handleSignFinish)
  }

  handleSignFinish = ({ origin, data: url }) => {
    if (this.props.anvilURL !== origin) return
    this.props.onFinish(url)
  }

  render () {
    const { signURL, onLoad, ...otherProps } = this.props
    const { iframeWarningProps, ...anvilFrameProps } = otherProps
    return (
      <iframe
        id="anvil-signature-frame"
        name="Anvil Etch E-Sign"
        title="Anvil Etch E-Sign"
        {...anvilFrameProps}
        src={signURL}
        onLoad={onLoad}
        ref={this.iframeRef}
      >
        <p className="anvil-iframe-warning" {...iframeWarningProps}>Your browser does not support iframes.</p>
      </iframe>
    )
  }
}

AnvilSignatureFrame.defaultProps = {
  onFinish: (url) => {
    console.log('RedirectURL:', url)
  },
  style: {
    width: '80vw',
    height: '85vh',
    maxWidth: '1200px',
    borderStyle: 'groove',
  },
  anvilURL: 'https://app.useanvil.com',
}

AnvilSignatureFrame.propTypes = {
  signURL: PropTypes.string,
  scroll: PropTypes.string,
  onLoad: PropTypes.func,
  onFinish: PropTypes.func,
  anvilURL: PropTypes.string,
}

export default AnvilSignatureFrame

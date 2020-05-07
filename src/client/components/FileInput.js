import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import theme from 'theme'

const Container = styled.div`
  position: relative;
`

const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  outline: 0 !important;

  font-weight: ${theme.fontWeights.bold};

  border: 2px dashed ${theme.colors.inputBorderColor};
  background: white;

  min-height: 140px;

  > * {
    z-index: 1;
  }

  > svg {
    display: none;
    position: absolute;
    top: 50%;
    left: 40px;
    margin-top: -29px;
    height: 58px;
    width: 58px;
    z-index: 0;

    polygon {
      fill: ${theme.colors.inputBorderColor};
    }
  }

  &.drop-active {
    border: 2px solid ${theme.colors.inputBorderColorActive};
  }

  &.drop-accept {
    border: 2px solid ${theme.colors.green};
    background: ${theme.colors.greens[2]};

    > svg polygon {
      fill: ${theme.colors.green};
    }
  }

  &.is-not-empty {
    border: 2px solid ${theme.colors.green};
  }

  &.drop-reject {
    border: 2px solid ${theme.colors.red};
  }

  &.drop-disabled {
  }

  flex-direction: row;
  min-height: 40px;

  > div,
  > button {
    margin: 0 10px 0 0 !important;

    &:last-child {
      margin: 0 !important;
    }
  }

  > svg {
    display: none;
    position: absolute;
    left: 15px;
    margin-top: -15px !important;
    height: 30px;
    width: 30px;
  }
`

const ImageContainer = styled.div`
  img {
    max-width: 100%;
    max-height: 285px;
    width: auto !important;
  }
`

const Text = styled.div`
  line-height: 1.5;
  display: block;
`

function acceptsImage (mime) {
  return mime.indexOf('image/') > -1
}

// Only used in IE.
const mimeTypeRegex = {
  'application/pdf': /\.pdf$/i,
  'application/json': /\.json$/i,
  'image/*': /\.(png|jpg|gif|jpeg)$/i,
  '*/*': /.+/i,
  '': /.+/i,
}

function acceptsFileName (mime, filename) {
  const re = mimeTypeRegex[mime]
  return re ? re.test(filename) : false
}

function getBase64 (file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => resolve(event.target.result)
  })
}

class FileInput extends React.Component {
  handleDrop = async (acceptedFiles, rejectedFiles) => {
    const {
      onChange,
      onBlur,
      accept,
      maxSize,
    } = this.props
    onBlur()

    if (!acceptedFiles || acceptedFiles.length === 0) {
      // IE doesnt have types for files sometimes...
      if (rejectedFiles && rejectedFiles.length && acceptsFileName(accept, rejectedFiles[0].name)) {
        acceptedFiles = rejectedFiles
      } else {
        return
      }
    }

    const acceptedFile = acceptedFiles[0]
    if (acceptedFile.size > maxSize) {
      // FIXME: figure out a nicer way to get an error to the user. Could use validation?
      const message = `File too large. Max is ${Math.round(maxSize / 1024 / 1024)}MB`
      alert(message)
      return
    }

    const file = acceptedFile
    const value = {
      mimetype: file.type,
      name: file.name,
      base64: await getBase64(file),
    }
    onChange(value)
  }

  renderValue () {
    const { value } = this.props
    if (!value) return null

    const canPreview = acceptsImage(value.mimetype) && value.src
    if (canPreview) {
      return (
        <ImageContainer>
          <img src={value.src} alt={value.name} />
        </ImageContainer>
      )
    }

    return (
      <div>
        {value.name}
      </div>
    )
  }

   renderDefaultChildren = ({ isEmpty, dropText }) => {
     return isEmpty ? (
       <>
         <Text>{dropText}</Text>
       </>
     ) : this.renderValue()
   }

  renderDropzone = ({
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    draggedFiles,
    ...others
  }) => {
    const {
      value,
      disabled,
      dropText,
      children,
    } = this.props
    const className = []

    if (isDragActive) className.push('drop-active')
    if (isDragAccept) className.push('drop-accept')
    if (isDragReject) className.push('drop-reject')
    if (disabled) className.push('drop-disabled')
    className.push('dropzone')

    const isEmpty = !value
    if (!isEmpty) className.push('is-not-empty')
    const inputProps = {}

    return (
      <StyledDropzone
        {...getRootProps({ refKey: 'innerRef' })}
        className={className.join(' ')}
      >
        <input {...getInputProps()} {...inputProps} />
        {children
          ? children({ isEmpty, value })
          : this.renderDefaultChildren({ isEmpty, dropText })}
      </StyledDropzone>
    )
  }

  render () {
    const {
      disabled,
      accept,
      onFocus,
      onBlur,
      maxSize,
      className,
    } = this.props
    return (
      <Container className={className}>
        <Dropzone
          accept={accept}
          multiple={false}
          disabled={disabled}
          onDrop={this.handleDrop}
          onDragEnter={() => onFocus()}
          onDragLeave={() => onBlur()}
          maxSize={maxSize}
        >
          {this.renderDropzone}
        </Dropzone>
      </Container>
    )
  }
}

FileInput.defaultProps = {
  value: null,
  disabled: false,
  touched: false,
  error: null,
  accept: '', // can be mimetype

  showBackground: false,
  dropText: 'Drop a File',

  maxSize: 2 * 1024 * 1024, // 2mb

  onFocus: () => {},
  onBlur: () => {},

  children: null,
}

FileInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  dropText: PropTypes.string,

  accept: PropTypes.string,
  maxSize: PropTypes.number,
  disabled: PropTypes.bool,

  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  onChange: PropTypes.func,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

  children: PropTypes.func,
  className: PropTypes.string,
}

export default FileInput

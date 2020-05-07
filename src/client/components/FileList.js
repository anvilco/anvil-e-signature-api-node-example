import { last } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

import IconDocument from 'components/icons/IconDocument'
import IconImage from 'components/icons/IconImage'

import Content from 'components/Content'
import CircleIcon from 'components/CircleIcon'

const TypeContainer = styled.div`
  margin-right: 6px;
  font-size: 12px;
  text-transform: uppercase;
  flex-shrink: 0;
  color: ${theme.textColors.subtleBlue};
  font-weight: ${theme.fontWeights.bold};
`

const NameContainer = styled.div``

const Name = styled.div``

const Description = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${theme.textColors.subtleBlue};
`

const imageTypes = {
  png: true,
  gif: true,
  jpg: true,
  jpeg: true,
  tif: true,
  svg: true,
}

function getFileType (mimetype) {
  return last((mimetype || '').split('/'))
}

function isImageType (mimetype) {
  return !!imageTypes[getFileType(mimetype)]
}

class FileList extends React.Component {
  renderIcon (mimetype) {
    const Icon = isImageType(mimetype)
      ? IconImage
      : IconDocument
    return <Icon />
  }

  render () {
    const { files } = this.props

    return (
      <Content.List
        items={files}
        renderItem={(file, index) => (
          <React.Fragment key={index}>
            <CircleIcon>
              {this.renderIcon(file.mimetype)}
            </CircleIcon>
            <NameContainer>
              <Name>{file.filename}</Name>
              {file.description
                ? (
                  <Description>{file.description}</Description>
                )
                : null}
            </NameContainer>
            <Content.List.Actions>
              <TypeContainer>
                {getFileType(file.mimetype)} {isImageType(file.mimetype) ? 'image' : ''}
              </TypeContainer>
            </Content.List.Actions>
          </React.Fragment>
        )}
      />
    )
  }
}

FileList.defaultProps = {
}

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    mimetype: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
  })).isRequired,
}

export default FileList

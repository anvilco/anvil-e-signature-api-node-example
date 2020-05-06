import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Content from 'components/Content'
import FileList from 'components/FileList'

import NewFileForm from './NewFileForm'

const StyledContainer = styled.div``

const Title = styled.h1`
  margin-bottom: 20px;
`

const Description = styled.p`
  margin-bottom: 40px;
`

class AllFilesView extends Component {
  handleAddFile = (data) => {
    const { addFile } = this.props
    return addFile(data)
  }

  renderFiles () {
    const { files } = this.props
    return (
      <Content.Card>
        <FileList
          files={files}
        />
      </Content.Card>
    )
  }

  render () {
    const { username } = this.props
    return (
      <StyledContainer>
        <Title>{`Hi ${username} 👋`}</Title>
        <Description>We're excited at the prospect of you joining the team!</Description>
        {this.renderFiles()}
        <NewFileForm onSubmit={this.handleAddFile} />
      </StyledContainer>
    )
  }
}

AllFilesView.propTypes = {
  addFile: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  })).isRequired,
}

export default AllFilesView

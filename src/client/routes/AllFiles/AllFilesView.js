import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

import NewFileForm from './NewFileForm'

const StyledContainer = styled.div`

`

const StyledTitle = styled.h1`
  margin-bottom: 20px;
  color: ${theme.textColor}
`

const StyledTeamMembersTitle = styled.h4`
  margin-bottom: 20px;
  color: ${theme.textColor}
`

const StyledExplanationText = styled.span`
  margin-bottom: 20px;
  color: ${theme.textColor}
`

class AllFilesView extends Component {
  renderFiles (team) {
    return (
      <>
        <StyledTeamMembersTitle>Files</StyledTeamMembersTitle>
        {JSON.stringify(this.props.files)}
      </>
    )
  }

  render () {
    const { username, files } = this.props
    return (
      <StyledContainer>
        <StyledTitle>{`Hi ${username} 👋`}</StyledTitle>
        <StyledExplanationText>We're excited at the prospect of you joining the team!</StyledExplanationText>
        {this.renderFiles(files)}
        <NewFileForm />
      </StyledContainer>
    )
  }
}

AllFilesView.propTypes = {
  username: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  })).isRequired,
}

export default AllFilesView

import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import theme from 'theme'

import TeamMember from 'components/TeamMember'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Sans-Serif;
    background-color: ${theme.colors.blacks[5]};
  }
`

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
  state = {
    username: null,
    files: [],
  }

  async componentDidMount () {
    await this.getUsername()
    await this.getFiles()
  }

  async getUsername () {
    const res = await fetch('/api/username')
    const json = await res.json()
    return this.setState({ username: json.username })
  }

  async getFiles () {
    const res = await fetch('/api/files')
    const json = await res.json()
    return this.setState({ files: json.files })
  }

  renderFiles (team) {
    return (
      <>
        <StyledTeamMembersTitle>Files</StyledTeamMembersTitle>
        {JSON.stringify(this.state.files)}
      </>
    )
  }

  renderTeamMember (teamMember) {
    return <TeamMember key={teamMember.id} teamMember={teamMember} />
  }

  render () {
    const { username, files } = this.state
    return (
      <StyledContainer>
        <GlobalStyle />
        {
          username
            ? <StyledTitle>{`Hi ${username} 👋`}</StyledTitle>
            : <StyledTitle>Loading..</StyledTitle>
        }
        <StyledExplanationText>We're excited at the prospect of you joining the team!</StyledExplanationText>
        {
          files && files.length > 0
            ? this.renderFiles(files)
            : 'hmm no team members returned from the API!'
        }
      </StyledContainer>
    )
  }
}

export default AllFilesView

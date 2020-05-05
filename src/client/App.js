import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import './app.css'
import theme from './theme'

import TeamMember from './components/TeamMember'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.blacks[5]};
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

class App extends Component {
  state = {
    username: null,
    teamMembers: [],
  }

  async componentDidMount () {
    await this.getUsername()
    await this.getUsers()
  }

  async getUsername () {
    const res = await fetch('/api/username')
    const json = await res.json()
    return this.setState({ username: json.username })
  }

  async getUsers () {
    const res = await fetch('/api/team-members')
    const json = await res.json()
    return this.setState({ teamMembers: json.teamMembers })
  }

  renderTeamMembers (team) {
    return (
      <>
        <StyledTeamMembersTitle>Team Members</StyledTeamMembersTitle>
        {_.map(team, (teamMember) => this.renderTeamMember(teamMember))}
      </>
    )
  }

  renderTeamMember (teamMember) {
    return <TeamMember teamMember={teamMember} />
  }

  render () {
    const { username, teamMembers } = this.state
    return (
      <StyledContainer>
        {
          username
            ? <StyledTitle>{`Hi ${username} 👋`}</StyledTitle>
            : <StyledTitle>Loading..</StyledTitle>
        }
        <StyledExplanationText>We're excited at the prospect of you joining the team!</StyledExplanationText>
        {
          teamMembers && teamMembers.length > 0
            ? this.renderTeamMembers(teamMembers)
            : 'hmm no team members returned from the API!'
        }
      </StyledContainer>
    )
  }
}

export default App

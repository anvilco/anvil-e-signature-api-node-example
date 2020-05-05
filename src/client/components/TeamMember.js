import React, { Component } from 'react'
import styled from 'styled-components'

import theme from '../theme'

import PropTypes from 'prop-types'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 10px;
  padding: 10px;
  background-color: ${theme.colors.greens[10]};
  border-radius: 2px;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.textColor};
  margin-right: 10px;
`

const StyledText = styled.span`
  font-size: 20px;
  color: ${theme.textColor};
  margin-right: 10px;
`

class TeamMember extends Component {
  render () {
    const { teamMember } = this.props
    return (
      <StyledContainer>
        <StyledRow>
          <StyledTitle>First Name: </StyledTitle>
          <StyledText>{teamMember.firstName}</StyledText>
        </StyledRow>
        <StyledRow>
          <StyledTitle>Last Name: </StyledTitle>
          <StyledText> {teamMember.lastName}</StyledText>
        </StyledRow>
        <StyledRow>
          <StyledTitle>Fave Emoji: </StyledTitle>
          <StyledText>{teamMember.favoriteEmoji}</StyledText>
        </StyledRow>
      </StyledContainer>
    )
  }
}

TeamMember.propTypes = {
  teamMember: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    favoriteEmoji: PropTypes.string.isRequired,
  }),
}

export default TeamMember

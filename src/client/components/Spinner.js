import React from 'react'
import styled from 'styled-components'

import theme from 'theme'

const Dot1 = styled.div`
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: ${theme.colors.greens[80]};
  border-radius: 100%;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;

  @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
  @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
`
const Dot2 = styled.div`
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: ${theme.colors.greens[80]};
  border-radius: 100%;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;

  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;

  @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
  @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
`

const StyledSpinner = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  position: relative;
  text-align: center;
  
  -webkit-animation: sk-rotate 2.0s infinite linear;
  animation: sk-rotate 2.0s infinite linear;
`

const Spinner = () => (
  <StyledSpinner>
    <Dot1 />
    <Dot2 />
  </StyledSpinner>
)

export default Spinner

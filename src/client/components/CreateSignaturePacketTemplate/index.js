import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import Content from 'components/Content'
import { createRequest } from 'helpers'
import { Title, TitleBar, Description, StyledLink, StyledAnchor, Response } from 'components/styled'
import SignaturePacketForm from './SignaturePacketForm'
import EtchStamp from 'static/etch-stamp.png'

const createSignaturePacketTemplate = ({ title, description, secondaryDescription, CustomForm = SignaturePacketForm }) => {
  const history = useHistory()
  const [createPacketResponse, setCreatePacketResponse] = useState(undefined)

  const createSignaturePacket = createRequest({
    url: '/api/packet/create',
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, data, error } = JSON.parse(responseText)
      if (statusCode === 200 && data?.data?.createEtchPacket?.eid) {
        history.push(data?.data?.createEtchPacket?.eid)
      } else {
        setCreatePacketResponse(`Error: ${error?.message}`)
      }
    },
  })

  const renderCreatePacketResponse = () => {
    return (
      <>
        <Response color="failure">
          {createPacketResponse}
        </Response>
        {(createPacketResponse && createPacketResponse.startsWith('Error: API key required.')) &&
          <StyledAnchor
            size="large"
            href="https://app.useanvil.com/signup/etch-api"
            target="_blank"
          >
            Quick Sign Up
          </StyledAnchor>}
      </>
    )
  }

  return (
    <>
      <TitleBar>
        <Title>{title}</Title>
        <img src={EtchStamp} alt="Anvil Etch e-signatures" width={50} height={50} />
      </TitleBar>
      <Description>{description}</Description>
      {secondaryDescription}
      <Content.Card>
        <CustomForm onSubmit={createSignaturePacket} />
        {renderCreatePacketResponse()}
      </Content.Card>
      <StyledLink size="small" to="/">Back to index</StyledLink>
    </>
  )
}

createSignaturePacketTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  secondaryDescription: PropTypes.element,
  CustomForm: PropTypes.elementType,
}

export default createSignaturePacketTemplate

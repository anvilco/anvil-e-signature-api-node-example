import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import Content from 'components/Content'
import { createRequest } from 'helpers'
import { Footer, StyledLink, StyledAnchor, Response, Description } from 'components/styled'
import DefaultForm from './PacketForm'
import PageTitle from 'components/PageTitle'

const CreatePacketTemplate = ({ title, description, packetType, PacketForm = DefaultForm }) => {
  const navigate = useNavigate()
  const [createPacketResponse, setCreatePacketResponse] = useState(undefined)

  const createSignaturePacket = createRequest({
    url: packetType === 'email' ? '/api/packet/create?type=email' : '/api/packet/create?type=embedded',
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, data, error } = JSON.parse(responseText)
      if (statusCode === 200 && data?.data?.createEtchPacket?.eid) {
        navigate(`/packet/${data.data.createEtchPacket.eid}`)
        return true
      } else {
        setCreatePacketResponse(`Error: ${error?.message}`)
        return false
      }
    },
  })

  const renderCreatePacketResponse = () => {
    return (
      <>
        {createPacketResponse
          ? (<Response color="failure">{createPacketResponse}</Response>)
          : null}
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
      <PageTitle>{title}</PageTitle>
      <Description>{description}</Description>
      <Content.Card>
        <PacketForm onSubmit={createSignaturePacket} />
        {renderCreatePacketResponse()}
      </Content.Card>
      <Footer>
        <StyledLink size="small" to="/">Back to index</StyledLink>
      </Footer>
    </>
  )
}

CreatePacketTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  packetType: PropTypes.string.isRequired,
  PacketForm: PropTypes.elementType,
}

export default CreatePacketTemplate

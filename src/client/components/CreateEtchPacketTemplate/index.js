import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'
import Content from 'components/Content'
import { createRequest } from 'helpers'
import { Title, Description, StyledLink } from 'components/styled'

const StyledContainer = styled.div``

const createEtchPacketTemplate = ({ title, description, CustomForm }) => {
  const [createPacketResponse, setCreatePacketResponse] = useState(undefined)
  const [packetDetails, setPacketDetails] = useState(undefined)
  const [etchSignURL, setEtchSignURL] = useState(undefined)

  const createEtchPacket = createRequest({
    url: '/api/embeddedEtch/create',
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, data, errors } = JSON.parse(responseText)
      if (statusCode === 200) {
        setCreatePacketResponse('Etch packet created!')
        setPacketDetails(data?.packetData?.data?.createEtchPacket)
        setEtchSignURL(data?.url)
      } else if (statusCode === 400) {
        setCreatePacketResponse(`Error: ${errors[0]?.message}`)
      } else {
        setCreatePacketResponse(`Error: ${errors?.message}`)
      }
    },
  })

  const renderPacketDetails = () => {
    if (packetDetails) {
      const { name: packetName, eid: packetEid, documentGroup } = packetDetails
      const { eid: docEid, status: docStatus, signers } = documentGroup
      return (
        <>
          <p>
            <b>Etch Packet Name:</b> {packetName}<br />
            <b>Etch Packet Eid:</b> {packetEid}
          </p>
          <p>
            <b>Document Group Eid:</b> {docEid}<br />
            <b>Document Group Status:</b> {docStatus}<br />
          </p>
          {signers.map((signer, index) => (
            <p key={index}>
              <b>Signer {index + 1} Name:</b> {signer?.name}<br />
              <b>Signer {index + 1} Email:</b> {signer?.email}<br />
              <b>Signer {index + 1} Eid:</b> {signer?.eid}<br />
            </p>
          ))}
        </>
      )
    }
  }

  const renderToSignButton = () => {
    if (etchSignURL) {
      return (
        <Button
          type="cta"
          onClick={() => window.location.assign(etchSignURL)}
        >
          Go to Signature Page for Signer 1
        </Button>
      )
    }
  }

  return (
    <StyledContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Content.Card>
        <CustomForm onSubmit={createEtchPacket} />
        <p>{createPacketResponse}</p>
        {renderPacketDetails()}
        {renderToSignButton()}
      </Content.Card>
      <Button
        type="danger"
        as={StyledLink}
        to="/"
      >
        Return
      </Button>
    </StyledContainer>
  )
}

createEtchPacketTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  CustomForm: PropTypes.elementType.isRequired,
}

export default createEtchPacketTemplate

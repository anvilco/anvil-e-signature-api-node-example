import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Content from 'components/Content'
import { createRequest } from 'helpers'
import { Title, Description, StyledLink, StyledAnchor, Response } from 'components/styled'
import SignaturePacketForm from './SignaturePacketForm'

const createSignaturePacketTemplate = ({ title, description, CustomForm = SignaturePacketForm }) => {
  const [createPacketResponse, setCreatePacketResponse] = useState(undefined)
  const [packetDetails, setPacketDetails] = useState(undefined)
  const [generateURLResponse, setGenerateURLResponse] = useState(undefined)

  const createSignaturePacket = createRequest({
    url: '/api/packet/create',
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, data, error } = JSON.parse(responseText)
      if (statusCode === 200) {
        setCreatePacketResponse('Signature packet created!')
        setPacketDetails(data?.data?.createEtchPacket)
      } else {
        setCreatePacketResponse(`Error: ${error?.message}`)
        setPacketDetails(undefined)
        setGenerateURLResponse(undefined)
      }
    },
  })

  const generateSignURL = createRequest({
    url: '/api/packet/sign',
    myData: {
      clientUserId: packetDetails?.documentGroup?.eid,
      signerEid: packetDetails?.documentGroup?.signers[0]?.eid,
    },
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, url, error } = JSON.parse(responseText)
      if (statusCode === 200) {
        return url
      } else {
        setGenerateURLResponse(`Error: ${error?.message}`)
      }
    },
  })

  const redirectToSign = async () => {
    const signURL = await generateSignURL()
    window.location.assign(signURL)
  }

  const renderCreatePacketResponse = () => {
    if (packetDetails) {
      const { name: packetName, eid: packetEid, documentGroup } = packetDetails
      const { eid: docEid, status: docStatus, signers } = documentGroup
      return (
        <>
          <Response color="success">{createPacketResponse}</Response>
          <p>
            <b>Signature Packet Name:</b> {packetName}<br />
            <b>Signature Packet eID:</b> {packetEid}
          </p>
          <p>
            <b>Document Group Status:</b> {docStatus}<br />
            <b>Document Group eID:</b> {docEid}<br />
          </p>
          {signers.map((signer, index) => (
            <p key={index}>
              <b>Signer {index + 1} Name:</b> {signer?.name}<br />
              <b>Signer {index + 1} Email:</b> {signer?.email}<br />
              <b>Signer {index + 1} eID:</b> {signer?.eid}<br />
            </p>
          ))}
          <br />
          <Button
            type="cta"
            onClick={async () => await redirectToSign()}
          >
            Sign Now
          </Button>
          <Response color="failure">{generateURLResponse}</Response>
        </>
      )
    } else {
      return (
        <>
          <Response color="failure">
            {createPacketResponse}
          </Response>
          {(createPacketResponse && createPacketResponse.startsWith('Error: API key required.')) &&
            <StyledAnchor
              link
              href="https://app.useanvil.com/signup/etch-api"
              target="_blank"
            >
              Sign Up Here
            </StyledAnchor>}
        </>
      )
    }
  }

  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
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
  CustomForm: PropTypes.elementType,
}

export default createSignaturePacketTemplate

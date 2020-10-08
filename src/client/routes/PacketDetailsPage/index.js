import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from 'components/Button'
import Content from 'components/Content'
import Spinner from 'components/Spinner'
import { Description, Response, StyledAnchor, StyledLink, Title, TitleBar } from 'components/styled'
import { buildAnvilURL, createRequest, parseQueryString } from 'helpers'
import EtchStamp from 'static/etch-stamp.png'

const PacketDetailsPage = () => {
  const { packetEid } = useParams()
  const [packetDetails, setPacketDetails] = useState(undefined)
  const [queryStringData, setQueryStringData] = useState(undefined)
  const [generateURLResponse, setGenerateURLResponse] = useState(undefined)
  const [nextSignerNum, setNextSignerNum] = useState(1)

  useEffect(() => {
    async function fetchData () {
      setPacketDetails(await getEtchPacket())
    }
    setQueryStringData(parseQueryString())
    fetchData()
  }, [])

  const getEtchPacket = createRequest({
    method: 'GET',
    url: `/api/packet/${packetEid}`,
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, data, error } = JSON.parse(responseText)
      if (statusCode === 200) {
        const etchPacket = data.data.etchPacket
        const nextSigner = etchPacket.documentGroup.signers.find((signer) => signer.status === 'sent')
        if (nextSigner) setNextSignerNum(nextSigner.routingOrder)
        return etchPacket
      } else {
        return `Error: ${error?.message}`
      }
    },
  })

  const generateSignURL = createRequest({
    url: '/api/packet/sign',
    myData: {
      clientUserId: packetEid,
      signerEid: queryStringData?.nextSignerEid || packetDetails?.documentGroup.signers[0].eid,
    },
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, url, error } = JSON.parse(responseText)
      if (statusCode === 200) {
        return url
      } else {
        setGenerateURLResponse(error.message ? `Error: ${error?.message}` : `Status code: ${statusCode}`)
      }
    },
  })

  const handlePacketDownload = () => {
    window.location.assign(`/api/packet/download/${packetEid}`)
  }

  const handleSignButtonClick = async () => {
    const signURL = await generateSignURL()
    if (signURL) window.location.assign(signURL)
  }

  const renderHeader = () => {
    if (packetDetails?.documentGroup.signers[0].signActionType === 'email') {
      return (
        <>
          <TitleBar>
            <Title>Email Signature Packet</Title>
            <img src={EtchStamp} alt="Anvil Etch e-signatures" width={60} height={60} />
          </TitleBar>
          <Description>Anvil is managing the signing process for this packet via email.</Description>
        </>
      )
    }
    return (
      <>
        <TitleBar>
          <Title>Embedded Signature Packet</Title>
          <img src={EtchStamp} alt="Anvil Etch e-signatures" width={60} height={60} />
        </TitleBar>
        <Description>This app is controlling the signing process, and no emails are sent from Anvil.</Description>
      </>
    )
  }

  const renderQueryParamData = () => {
    if (queryStringData?.signerEid) {
      const { documentGroupEid, documentGroupStatus, etchPacketEid, etchPacketName, signerEid, signerStatus } = queryStringData
      const { etchTemplateEid, organizationSlug } = queryStringData
      return (
        <Content.Card>
          <h3>Signer Finished!</h3>
          <h4>
            When a signer finishes signing, the browser will be redirected to the redirectURL attached to the signer.
            Your redirectURL will get the following query parameters.
          </h4>
          <p>
            Signature Packet Name: <b>{etchPacketName}</b><br />
            Signature Packet EID: <b>{etchPacketEid}</b>
          </p>
          <p>
            Document Group Status: <b>{documentGroupStatus}</b><br />
            Document Group EID: <b>{documentGroupEid}</b><br />
          </p>
          <p>
            Signer Status: <b>{signerStatus}</b><br />
            Signer EID: <b>{signerEid}</b><br />
          </p>
          <p>
            Signer Template EID: <b>{etchTemplateEid}</b><br />
            Organzation Slug: <b>{organizationSlug}</b><br />
          </p>
        </Content.Card>
      )
    }
  }

  const renderPacketDetails = () => {
    if (packetDetails && typeof packetDetails !== 'string') {
      const { name: packetName, documentGroup, eid: packetEid, detailsURL } = packetDetails
      const { eid: docEid, signers, status: docStatus } = documentGroup
      return (
        <>
          <h3>Packet Attributes</h3>
          <p>
            Signature Packet Name: <b>{packetName}</b><br />
            Signature Packet EID: <b>{packetEid}</b>
          </p>
          <p>
            Document Group Status: <b>{docStatus}</b><br />
            Document Group EID: <b>{docEid}</b><br />
          </p>
          {signers.map((signer, index) => (
            <p key={index}>
              Signer {index + 1} Name: <b>{signer.name}</b><br />
              Signer {index + 1} Email: <b>{signer.email}</b><br />
              Signer {index + 1} Status: <b>{signer.status}</b><br />
              Signer {index + 1} Type: <b>{signer.signActionType}</b><br />
              Signer {index + 1} EID: <b>{signer.eid}</b><br />
            </p>
          ))}
          <StyledAnchor
            href={buildAnvilURL(detailsURL)}
            target="_blank"
            rel="noreferrer"
            size="small"
          >
            View packet on your Anvil dashboard →
          </StyledAnchor>
        </>
      )
    } else {
      return (
        <Response color="failure">{packetDetails}</Response>
      )
    }
  }

  const renderAction = () => {
    if (packetDetails?.documentGroup?.status === 'completed') {
      return (
        <>
          <Response color="success">Your signature packet is complete! Your signed documents are available here for download.</Response>
          <Button
            type="cta"
            onClick={handlePacketDownload}
          >
            Download Signed Documents as Zip
          </Button>
        </>
      )
    } else if (packetDetails?.documentGroup.signers[nextSignerNum - 1].signActionType === 'email') {
      return (
        <Response color="failure">Your signature packet is not yet complete. Signer {nextSignerNum} has received an email and has yet to sign!</Response>
      )
    } else {
      return (
        <>
          <Response color="failure">Your signature packet is not yet complete. Signer {nextSignerNum} can sign by clicking the button below.</Response>
          <Button
            type="cta"
            onClick={async () => handleSignButtonClick()}
          >
            Sign Now as Signer {nextSignerNum}
          </Button>
          <Response color="failure">{generateURLResponse}</Response>
        </>
      )
    }
  }

  const renderDetailsAndAction = () => {
    if (!packetDetails) return <Spinner position="center" />
    return (
      <Content.Card>
        {renderPacketDetails()}
        {renderAction()}
      </Content.Card>
    )
  }

  return (
    <>
      {renderHeader()}
      {renderQueryParamData()}
      {renderDetailsAndAction()}
      <StyledLink size="small" to="/">Back to index</StyledLink>
    </>
  )
}

export default PacketDetailsPage

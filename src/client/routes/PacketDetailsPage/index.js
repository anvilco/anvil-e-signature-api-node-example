import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import theme from 'theme'
import AnvilEmbedFrame from '@anvilco/anvil-embed-frame'
import AnvilSignatureModal from '@anvilco/react-signature-modal'
import '@anvilco/react-signature-modal/dist/styles.css'

import Button from 'components/Button'
import Content from 'components/Content'
import Spinner from 'components/Spinner'
import DocsLink from 'components/DocsLink'
import { Description, Response, StyledAnchor, StyledLink, Flex, Footer } from 'components/styled'
import PageTitle from 'components/PageTitle'

import { createRequest, parseQueryString, isDevelopment } from 'helpers'

const PacketDetailsPage = () => {
  const { packetEid } = useParams()
  const [packetDetails, setPacketDetails] = useState(undefined)
  const [queryStringData, setQueryStringData] = useState(undefined)
  const [signerCompleteDataType, setSignerCompleteDataType] = useState(undefined)
  const [generateURLResponse, setGenerateURLResponse] = useState(undefined)
  const [nextSignerNum, setNextSignerNum] = useState(1)
  const [signURL, setSignURL] = useState(undefined)
  const [isSignFrameOpen, setIsSignFrameOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData () {
      setPacketDetails(await getEtchPacket())
    }
    setQueryStringData(parseQueryString())
    setSignerCompleteDataType('queryParams')
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
        const nextSigner = etchPacket.documentGroup.signers?.find((signer) => signer.status === 'sent')
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
      clientUserId: packetDetails?.documentGroup?.signers[nextSignerNum - 1].aliasId,
      signerEid: packetDetails?.documentGroup?.signers[nextSignerNum - 1].eid,
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

  const handleSignButtonClick = async () => {
    const signURL = await generateSignURL()
    if (signURL) window.location.assign(signURL)
  }

  const handleOpenSignFrame = async () => {
    const signURL = await generateSignURL()
    setSignURL(signURL)
    setIsSignFrameOpen(!isSignFrameOpen)
  }

  const handleOpenSignModal = async () => {
    const signURL = await generateSignURL()
    setSignURL(signURL)
    setIsModalOpen(true)
  }

  const handlePacketDownload = () => {
    const { documentGroup } = packetDetails
    const { eid: documentGroupEid } = documentGroup || {}
    window.location.assign(`/api/packet/download/${documentGroupEid}`)
  }

  const handleIframeLoad = async () => {
    console.log('IFrame loaded')
  }

  const handleIframeEvent = async (eventObject) => {
    // https://www.useanvil.com/docs/api/e-signatures/#events-from-the-iframe
    const { action } = eventObject
    console.log('Event Payload:', eventObject)

    if (action === 'signerComplete' || action === 'signerError') {
      setIsSignFrameOpen(false)
      setIsModalOpen(false)
    }

    setPacketDetails(await getEtchPacket())
    setQueryStringData(eventObject)
    setSignerCompleteDataType(action)
  }

  const renderHeader = () => {
    const redirectDescription = (
      <p>
        When a signer finishes signing, the browser will be redirected back
        to this page via the signer's
        <DocsLink href="signerOptions">redirectURL</DocsLink> option.
      </p>
    )
    if (packetDetails?.documentGroup?.signers[0].signActionType === 'email') {
      return (
        <>
          <PageTitle>Email Signature Packet</PageTitle>
          <Description>
            <p>
              Anvil is managing the signing process for this packet via email.
            </p>
            {redirectDescription}
          </Description>
        </>
      )
    }
    return (
      <>
        <PageTitle>Embedded Signature Packet</PageTitle>
        <Description>
          <p>
            This app is controlling the signing process. It will generate sign
            URLs for each signer via
            the <DocsLink href="generateEtchSignURL">generateEtchSignURL</DocsLink> GraphQL
            mutation.
          </p>
          {redirectDescription}
        </Description>
      </>
    )
  }

  const renderQueryParamData = () => {
    if (queryStringData?.signerEid) {
      const {
        documentGroupEid,
        documentGroupStatus,
        etchPacketEid,
        signerEid,
        signerStatus,
        nextSignerEid,

        // `action` will be 'signerComplete' or 'signerError'
        action,

        // Error information will be available when action === 'signerError'
        errorType,
        error,
        message,
      } = queryStringData

      let description = null
      if (signerCompleteDataType === 'onFinishSigning') {
        description = <>The signature frame's <code>onFinishSigning</code> callback returned a payload containing the following fields.</>
      } else if (signerCompleteDataType === 'onError') {
        description = <>The signature frame's <code>onError</code> callback returned a payload containing the following fields.</>
      } else {
        description = <>The <code>redirectURL</code> received the following query parameters.</>
      }

      const isError = action === 'signerError'
      return (
        <Content.Card>
          <h3>Signer {isError ? 'Error' : 'Finished'}!</h3>
          <Description>{description}</Description>
          {action && (
            <p>
              Callback <code>action</code>: <b>{action}</b>
            </p>
          )}
          {isError && (
            <p>
              <code>errorType</code>: <b>{errorType}</b><br />
              <code>error</code>: {error}<br />
              <code>message</code>: {message}<br />
            </p>
          )}
          <p>
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
          {nextSignerEid &&
            <p>
              Next Signer EID: <b>{nextSignerEid}</b>
            </p>}
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
          {signers?.map((signer, index) => (
            <p key={index}>
              Signer {index + 1} Name: <b>{signer.name}</b><br />
              Signer {index + 1} Email: <b>{signer.email}</b><br />
              Signer {index + 1} Sign Status: <b>{signer.status}</b><br />
              Signer {index + 1} Action Type: <b>{signer.signActionType}</b><br />
              Signer {index + 1} EID: <b>{signer.eid}</b><br />
            </p>
          ))}
          {isDevelopment()
            ? (
              <StyledAnchor
                href={detailsURL}
                target="_blank"
                rel="noreferrer"
                size="small"
              >
                View packet on your Anvil dashboard →
              </StyledAnchor>
              )
            : null}
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
    } else if (packetDetails?.documentGroup?.signers[nextSignerNum - 1].signActionType === 'email') {
      return (
        <Response color="failure">
          Your signature packet is not yet complete. Signer {nextSignerNum} has
          received an email to sign. Check your email!
        </Response>
      )
    } else {
      return (
        <>
          <Response color="failure">
            This signature packet is not yet complete. Sign for
            Signer {nextSignerNum} by clicking the button below. See
            the <code>/api/packet/sign</code> route
            in <code>server/routes/index.js</code> for details.
          </Response>
          <Flex>
            <Button
              type="cta"
              onClick={async () => handleSignButtonClick()}
              style={{ marginRight: '5px' }}
            >
              Go to Signing Page
            </Button>
            <Button
              type="orange"
              onClick={async () => handleOpenSignFrame()}
              style={{ marginLeft: '5px', marginRight: '5px' }}
            >
              {isSignFrameOpen ? 'Close' : 'Open'} Signing Frame
            </Button>
            <Button
              type="blue"
              onClick={async () => handleOpenSignModal()}
              style={{ marginLeft: '5px' }}
            >
              Open Signing Modal
            </Button>
          </Flex>
          <Response color="failure">{generateURLResponse}</Response>
          <Footer>
            Please contact us at <DocsLink href="mailto:support@useanvil.com">support@useanvil.com</DocsLink> if you have any questions!
          </Footer>
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

  const renderSignFrame = () => {
    if (isSignFrameOpen) {
      return (
        <Flex spacing="center">
          <AnvilEmbedFrame
            scroll="smooth"
            iframeURL={signURL}
            onLoad={handleIframeLoad}
            onEvent={handleIframeEvent}

            style={{
              width: '100%',
              height: '800px',
              border: 'none',
              boxShadow: theme.shadows[60],
            }}

            anvilURL={anvilBaseURL}
          />
        </Flex>
      )
    }
  }

  const renderSignModal = () => (
    <AnvilSignatureModal
      iframeURL={signURL}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onEvent={handleIframeEvent}

      anvilURL={anvilBaseURL}
    />
  )

  return (
    <>
      {renderHeader()}
      {renderQueryParamData()}
      {renderDetailsAndAction()}
      {renderSignFrame()}
      {renderSignModal()}
      <StyledLink size="small" to="/">Back to index</StyledLink>
    </>
  )
}

PacketDetailsPage.propTypes = {}

export default PacketDetailsPage

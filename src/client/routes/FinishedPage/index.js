import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import Content from 'components/Content'
import { Title, Description, StyledLink, StyledAnchor, Response } from 'components/styled'
import { createRequest, parseQueryString } from 'helpers'

const FinishedPage = () => {
  const [results, setResults] = useState(undefined)
  const [generateURLResponse, setGenerateURLResponse] = useState(undefined)
  const [signURL, setSignURL] = useState(undefined)

  useEffect(() => {
    const data = parseQueryString()
    setResults(data)
  }, [])

  const generateSignURL = createRequest({
    url: '/api/packet/sign',
    myData: {
      clientUserId: results?.documentGroupEid,
      signerEid: results?.nextSignerEid,
    },
    callback: async (response) => {
      const responseText = await response.text()
      const { statusCode, url, error } = JSON.parse(responseText)
      if (statusCode === 200) {
        setGenerateURLResponse('Signature link generated!')
        setSignURL(url)
      } else {
        setGenerateURLResponse(`Error: ${error?.message}`)
        setSignURL(undefined)
      }
    },
  })

  const renderData = () => {
    return (
      <>
        <p>
          <b>Signature Packet Name:</b> {results?.etchPacketName}<br />
          <b>Signature Packet eID:</b> {results?.etchPacketEid}
        </p>
        <p>
          <b>Document Group Status:</b> {results?.documentGroupStatus}<br />
          <b>Document Group eID:</b> {results?.documentGroupEid}
        </p>
        <p>
          <b>Signer Status:</b> {results?.signerStatus}<br />
          <b>Signer eID:</b> {results?.signerEid}
        </p>
        <p>
          <Button
            type="orange"
          >
            <StyledAnchor
              href={buildAnvilURL(`/org/${results?.organizationSlug}/etch/${results?.etchPacketEid}`)}
              target="_blank"
              rel="noreferrer"
            >
              Signature Packet Details
            </StyledAnchor>
          </Button>
        </p>
      </>
    )
  }

  const renderGenerateSignURLButton = () => {
    // if there is a next signer, create a button to generate next signer link
    // otherwise, create a link to the completed signature packet on the Anvil dashboard
    if (results?.nextSignerEid) {
      return (
        <Button
          type="cta"
          onClick={() => generateSignURL()}
        >
          Generate Signature Link for Next Signer
        </Button>
      )
    } else {
      return (
        <p>
          <Button
            type="cta"
          >
            <StyledAnchor
              href={buildAnvilURL(`/api/etch/download/${results?.documentGroupEid}/${results?.etchTemplateEid}.zip`)}
            >
              Download Documents as Zip File
            </StyledAnchor>
          </Button>
        </p>
      )
    }
  }

  const renderToSignButton = () => {
    if (signURL) {
      return (
        <>
          <Response color="success">{generateURLResponse}</Response>
          <Button
            type="cta"
            onClick={() => window.location.assign(signURL)}
          >
            Go to Signature Page for Next Signer
          </Button>
        </>
      )
    } else {
      return (
        <Response color="failure">{generateURLResponse}</Response>
      )
    }
  }

  return (
    <>
      <Title>Anvil Signature Packets</Title>
      {results?.nextSignerEid
        ? <Description>Success! You have signed your part of the document. The next signer has yet to sign.</Description>
        : <Description>Success! All signers have signed. You may download the completed documents here.</Description>}
      <Content.Card>
        {renderData()}
        {renderGenerateSignURLButton()}
        {renderToSignButton()}
      </Content.Card>
      <StyledLink to="/">Return</StyledLink>
    </>
  )
}

function buildAnvilURL (url) {
  return window.apiBaseURL + url
}

export default FinishedPage

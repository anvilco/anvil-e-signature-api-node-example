import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import Content from 'components/Content'
import { Title, Description, StyledLink, StyledAnchor, Response } from 'components/styled'
import { buildAnvilURL, createRequest, parseQueryString } from 'helpers'

const FinishedPage = () => {
  const [results, setResults] = useState(undefined)
  const [generateURLResponse, setGenerateURLResponse] = useState(undefined)

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
          <StyledAnchor
            href={buildAnvilURL(`/org/${results?.organizationSlug}/etch/${results?.etchPacketEid}`)}
            target="_blank"
            rel="noreferrer"
            size="small"
          >
            View packet on your Anvil dashboard →
          </StyledAnchor>
        </p>
      </>
    )
  }

  const renderGenerateSignURLButton = () => {
    // if there is a next signer, create a button to generate next signer link
    // otherwise, create a link to the completed signature packet on the Anvil dashboard
    if (results?.nextSignerEid) {
      return (
        <p>
          <Button
            type="cta"
            onClick={async () => await redirectToSign()}
          >
            Sign Now as Next Signer
          </Button>
          <Response color="failure">{generateURLResponse}</Response>
        </p>
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
              Download Signed Documents as Zip
            </StyledAnchor>
          </Button>
        </p>
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
      </Content.Card>
      <StyledLink size="small" to="/">Back to index</StyledLink>
    </>
  )
}

export default FinishedPage

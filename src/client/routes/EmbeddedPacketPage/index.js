import React from 'react'

import DocsLink from 'components/DocsLink'
import CreatePacketTemplate from 'components/CreatePacketTemplate'

const EmbeddedPacketPage = () => (
  <CreatePacketTemplate
    title="Create Embedded Signature Packet"
    packetType="embedded"
    description={
      <>
        <p>
          Your app will control the signing process and notify signers when it
          is their turn to sign.
        </p>
        <p>
          This enables you to take full control of the signing process flow in
          your app. Two mutations are involved in this
          process: <DocsLink href="createEtchPacket">createEtchPacket</DocsLink> to
          create the signature packet,
          and <DocsLink href="generateEtchSignURL">generateEtchSignURL</DocsLink> to
          generate the signature link for the next signer.
        </p>
        <p>
          See the <DocsLink href="signerOptions" isCode={false}>signer options docs</DocsLink> for
          more info on signer creation.
        </p>
      </>
    }
  />
)

EmbeddedPacketPage.propTypes = {}

export default EmbeddedPacketPage

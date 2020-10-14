import React from 'react'

import CreatePacketTemplate from 'components/CreatePacketTemplate'

const EmbeddedPacketPage = () => (
  <CreatePacketTemplate
    title="Create Embedded Signature Packet"
    packetType="embedded"
    description={
      <>
        <p>
          Your app will control the signing process and notify signers when it is their turn to sign.
        </p>
        <p>
          This enables you to take full control of the signing process flow in your app. Two mutations are involved
          in this process: <code>createEtchPacket</code> to create the signature packet, and <code>generateSignURL</code> to generate the signature
          link for your next signer.
        </p>
      </>
    }
  />
)

EmbeddedPacketPage.propTypes = {}

export default EmbeddedPacketPage

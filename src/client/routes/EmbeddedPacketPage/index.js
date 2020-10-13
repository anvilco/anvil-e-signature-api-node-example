import React from 'react'

import { Description } from 'components/styled'
import CreatePacketTemplate from 'components/CreatePacketTemplate'

const EmbeddedPacketPage = () => (
  <CreatePacketTemplate
    title="Create Embedded Signature Packet"
    packetType="embedded"
    description="Your app will control the signing process and notify signers when it is their turn to sign."
    secondaryDescription={
      <Description>
        This enables you to take full control of the signing process flow in your app. Two mutations are involved
        in this process: <code>createEtchPacket</code> to create the signature packet, and <code>generateSignURL</code> to generate the signature
        link for your next signer.
      </Description>
    }
  />
)

EmbeddedPacketPage.propTypes = {}

export default EmbeddedPacketPage

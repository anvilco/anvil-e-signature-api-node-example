import React from 'react'

import CreateSignaturePacketTemplate from 'components/CreateSignaturePacketTemplate'

const EmbeddedPacket = () => (
  <CreateSignaturePacketTemplate
    title="Create Embedded Signature Packet"
    description="Your app will control the signing process and notify signers when it is their turn to sign."
  />
)

EmbeddedPacket.propTypes = {}

export default EmbeddedPacket

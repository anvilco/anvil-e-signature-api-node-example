import React from 'react'

import CreateSignaturePacketTemplate from 'components/CreateSignaturePacketTemplate'

const EmailPacket = () => (
  <CreateSignaturePacketTemplate
    title="Create Email Signature Packet"
    description="Anvil will send an email to each signer listed when it is their turn to sign."
  />
)

EmailPacket.propTypes = {}

export default EmailPacket

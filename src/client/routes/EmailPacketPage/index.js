import React from 'react'

import { Description } from 'components/styled'
import CreatePacketTemplate from 'components/CreatePacketTemplate'

const EmailPacketPage = () => (
  <CreatePacketTemplate
    title="Create Email Signature Packet"
    packetType="email"
    description="Anvil will send an email to each signer listed when it is their turn to sign."
    secondaryDescription={
      <Description>
        This is the simplest way to use the e-signature API, only one mutation: <code>createEtchPacket</code> is used
        to fill the PDFs, create the signature packet, and kick off the signing process.
      </Description>
    }
  />
)

EmailPacketPage.propTypes = {}

export default EmailPacketPage

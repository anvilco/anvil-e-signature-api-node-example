import React from 'react'

import CreatePacketTemplate from 'components/CreatePacketTemplate'

const EmailPacketPage = () => (
  <CreatePacketTemplate
    title="Create Email Signature Packet"
    packetType="email"
    description={
      <>
        <p>
          Anvil will send an email to each signer when it's their turn to sign.
        </p>
        <p>
          This is the simplest way to use the e-signature API, only one mutation — <code>createEtchPacket</code> — is used
          to create the signature packet and kick off the signing process.
        </p>
      </>
    }
  />
)

EmailPacketPage.propTypes = {}

export default EmailPacketPage

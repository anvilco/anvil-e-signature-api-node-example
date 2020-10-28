import React from 'react'

import DocsLink from 'components/DocsLink'
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
          This is the simplest way to use the e-signature API, only one GraphQL
          mutation
          —<DocsLink href="createEtchPacket">createEtchPacket</DocsLink>—
          is used to create the signature
          packet and kick off the signing process.
        </p>
        <p>
          See the <DocsLink href="signerOptions" isCode={false}>signer options docs</DocsLink> for
          more info on signer creation.
        </p>
      </>
    }
  />
)

EmailPacketPage.propTypes = {}

export default EmailPacketPage

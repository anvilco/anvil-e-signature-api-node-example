import React from 'react'

import OneSignerForm from './OneSignerForm'
import CreateSignaturePacketTemplate from 'components/CreateSignaturePacketTemplate'

const OneSignerEmbedded = () => (
  <CreateSignaturePacketTemplate
    title="Anvil Signature Packets"
    description="For one signer. Sign your own documents."
    CustomForm={OneSignerForm}
  />
)

OneSignerEmbedded.propTypes = {}

export default OneSignerEmbedded

import React from 'react'

import TwoSignersForm from './TwoSignersForm'
import CreateSignaturePacketTemplate from 'components/CreateSignaturePacketTemplate'

const TwoSignersEmbedded = () => (
  <CreateSignaturePacketTemplate
    title="Anvil Signature Packets"
    description="For two signers. Sign yourself and request signatures."
    CustomForm={TwoSignersForm}
  />
)

TwoSignersEmbedded.propTypes = {}

export default TwoSignersEmbedded

import React from 'react'

import EtchPacketForm from './EtchPacketForm'
import CreateEtchPacketTemplate from 'components/CreateEtchPacketTemplate'

const TwoSignersEmbedded = () => (
  <CreateEtchPacketTemplate
    title="Etch Signatures for Two"
    description="For doucments involving two parties."
    CustomForm={EtchPacketForm}
  />
)

TwoSignersEmbedded.propTypes = {}

export default TwoSignersEmbedded

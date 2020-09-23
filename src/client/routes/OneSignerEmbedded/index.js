import React from 'react'

import EtchPacketForm from './EtchPacketForm'
import CreateEtchPacketTemplate from 'components/CreateEtchPacketTemplate'

const OneSignerEmbedded = () => (
  <CreateEtchPacketTemplate
    title="Etch Signatures for One"
    description="Sign your own documents."
    CustomForm={EtchPacketForm}
  />
)

OneSignerEmbedded.propTypes = {}

export default OneSignerEmbedded

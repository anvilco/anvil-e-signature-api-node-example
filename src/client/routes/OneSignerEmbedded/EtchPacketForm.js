import React from 'react'
import PropTypes from 'prop-types'

import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

class EtchPacketForm extends React.Component {
  render () {
    const { onSubmit } = this.props
    return (
      <Form
        onSubmit={onSubmit}
        submitButtonText="Create Etch Packet"
      >
        <FormField name="signerOneName">
          <Input
            key="signerOneName"
            required
            placeholder="Signer Name"
            autoFocus
          />,
        </FormField>
        <FormField name="signerOneEmail">
          <Input
            key="signerOneEmail"
            required
            placeholder="Signer Email"
          />,
        </FormField>
      </Form>
    )
  }
}

EtchPacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  items: PropTypes.array,
}

export default EtchPacketForm

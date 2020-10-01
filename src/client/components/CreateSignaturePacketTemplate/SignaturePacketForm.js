import React from 'react'
import PropTypes from 'prop-types'

import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

class SignaturePacketForm extends React.Component {
  render () {
    const { submitButtonText = 'Create Signature Packet', onSubmit } = this.props
    return (
      <Form
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
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
        <FormField name="signerTwoName">
          <Input
            key="signerTwoName"
            placeholder="Second Signer Name"
          />,
        </FormField>
        <FormField name="signerTwoEmail">
          <Input
            key="signerTwoEmail"
            placeholder="Second Signer Email"
          />,
        </FormField>
        <FormField name="packetName">
          <Input
            key="packetName"
            placeholder="Signature Packet Name (optional)"
          />,
        </FormField>
      </Form>
    )
  }
}

SignaturePacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  items: PropTypes.array,
}

export default SignaturePacketForm

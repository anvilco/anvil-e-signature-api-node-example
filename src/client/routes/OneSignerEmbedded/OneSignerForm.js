import React from 'react'
import PropTypes from 'prop-types'

import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

class OneSignerForm extends React.Component {
  render () {
    const { submitButtonText, onSubmit } = this.props
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

OneSignerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  items: PropTypes.array,
}

export default OneSignerForm

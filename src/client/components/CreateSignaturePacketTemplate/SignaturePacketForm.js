import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

const SignaturePacketForm = ({ submitButtonText = 'Create Signature Packet', onSubmit }) => {
  const [singleSigner, setSingleSigner] = useState(true)

  const renderAddSignerButton = () => {
    if (singleSigner) return <Button onClick={() => setSingleSigner(false)} type="button">Add Second Signer</Button>
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitButtonText={submitButtonText}
    >
      <FormField name="packetName" label="Packet Name">
        <Input
          key="packetName"
          required
          placeholder="Non-Disclosure Agreements"
          autoFocus
        />,
      </FormField>
      <FormField name="signerOneName" label="First Signer Name">
        <Input
          key="signerOneName"
          required
          placeholder="Sally Jones"
        />,
      </FormField>
      <FormField name="signerOneEmail" label="First Signer Email">
        <Input
          key="signerOneEmail"
          required
          placeholder="Sally@example.com"
        />,
      </FormField>
      <b>First Signer Options</b>
      <Checkbox name="signerOneSignatureMode" defaultChecked>
        Signer draws their signatures
      </Checkbox>
      <Checkbox name="signerOneAcceptEachField" defaultChecked>
        Signer must click each signature block
      </Checkbox>
      {renderAddSignerButton()}
      {!singleSigner && <br />}
      {!singleSigner &&
        <FormField name="signerTwoName" label="Second Signer Name">
          <Input
            key="signerTwoName"
            placeholder="Henry Huxley"
          />,
        </FormField>}
      {!singleSigner &&
        <FormField name="signerTwoEmail" label="Second Signer Email">
          <Input
            key="signerTwoEmail"
            placeholder="Henry@personal.org"
          />,
        </FormField>}
      {!singleSigner &&
        <b>Second Signer Options</b>}
      {!singleSigner &&
        <Checkbox name="signerTwoSignatureMode" defaultChecked>
          Signer draws their signatures
        </Checkbox>}
      {!singleSigner &&
        <Checkbox name="signerTwoAcceptEachField" defaultChecked>
          Signer must click each signature block
        </Checkbox>}
    </Form>
  )
}

SignaturePacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  items: PropTypes.array,
}

export default SignaturePacketForm

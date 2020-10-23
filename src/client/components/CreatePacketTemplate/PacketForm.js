import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

const PacketForm = ({ submitButtonText = 'Create Signature Packet', onSubmit }) => {
  const [singleSigner, setSingleSigner] = useState(true)

  const renderAddSignerButton = () => {
    if (singleSigner) return <Button onClick={() => setSingleSigner(false)} type="button">Add Second Signer</Button>
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitButtonText={submitButtonText}
    >
      <FormField name="packetName" label="Packet Name" wide>
        <Input
          key="packetName"
          required
          placeholder="Non-Disclosure Agreements"
          autoFocus
        />,
      </FormField>
      <FormField name="signerOneName" label="First Signer">
        <Input
          key="signerOneName"
          required
          placeholder="Sally Jones"
        />,
      </FormField>
      <FormField name="signerOneEmail">
        <Input
          key="signerOneEmail"
          required
          placeholder="Sally@example.com"
        />,
      </FormField>
      <b>Signer Options</b>
      <Checkbox name="signerOneSignatureMode" defaultChecked>
        Signer draws their signatures
      </Checkbox>
      <Checkbox name="signerOneAcceptEachField" defaultChecked>
        Signer must click each signature block
      </Checkbox>
      <Checkbox name="signerOneEnableEmails">
        Signer receives workflow complete notification email
      </Checkbox>
      <br />
      {renderAddSignerButton()}
      {!singleSigner && <br />}
      {!singleSigner &&
        <FormField name="signerTwoName" label="Second Signer">
          <Input
            key="signerTwoName"
            placeholder="Henry Huxley"
          />,
        </FormField>}
      {!singleSigner &&
        <FormField name="signerTwoEmail">
          <Input
            key="signerTwoEmail"
            placeholder="Henry@personal.org"
          />,
        </FormField>}
      {!singleSigner &&
        <b>Signer Options</b>}
      {!singleSigner &&
        <Checkbox name="signerTwoSignatureMode" defaultChecked>
          Signer draws their signatures
        </Checkbox>}
      {!singleSigner &&
        <Checkbox name="signerTwoAcceptEachField" defaultChecked>
          Signer must click each signature block
        </Checkbox>}
      {!singleSigner &&
        <Checkbox name="signerTwoEnableEmails">
          Signer receives complete notification email
        </Checkbox>}
    </Form>
  )
}

PacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
}

export default PacketForm

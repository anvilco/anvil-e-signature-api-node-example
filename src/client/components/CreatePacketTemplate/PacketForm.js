import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

const SignerFieldsContainer = styled.div`
  margin-bottom: 20px;
`

const PacketForm = ({ submitButtonText = 'Create Signature Packet', onSubmit }) => {
  const [hasTwoSigners, setHasTwoSigners] = useState(false)

  const renderAddSignerButton = () => (
    <p>
      <Button
        onClick={() => setHasTwoSigners(!hasTwoSigners)}
        type="button"
      >
        {hasTwoSigners ? 'Remove' : 'Add'} Second Signer
      </Button>
    </p>
  )

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
      {renderSignerFields({
        prefix: 'signerOne',
        signerLabel: 'First Signer',
        namePlaceholder: 'Sally Jones',
        emailPlaceholder: 'sally@example.com',
      })}

      {hasTwoSigners
        ? renderSignerFields({
          prefix: 'signerTwo',
          signerLabel: 'Second Signer',
          namePlaceholder: 'Henry Huxley',
          emailPlaceholder: 'henry@personal.org',
        })
        : null}

      {renderAddSignerButton()}
    </Form>
  )
}

const renderSignerFields = ({ prefix, signerLabel, namePlaceholder, emailPlaceholder }) => (
  <SignerFieldsContainer>
    <FormField name={`${prefix}Name`} label={signerLabel}>
      <Input
        key={`${prefix}Name`}
        required
        placeholder={namePlaceholder}
      />,
    </FormField>
    <FormField name={`${prefix}Email`}>
      <Input
        key={`${prefix}Email`}
        required
        placeholder={emailPlaceholder}
      />,
    </FormField>
    <b>{signerLabel} Options</b>
    <Checkbox name={`${prefix}SignatureMode`} defaultChecked>
      Signer draws their signatures
    </Checkbox>
    <Checkbox name={`${prefix}AcceptEachField`} defaultChecked>
      Signer must click each signature block
    </Checkbox>
    <Checkbox name={`${prefix}EnableEmails`}>
      Signer receives complete notification email
    </Checkbox>
  </SignerFieldsContainer>
)

PacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
}

export default PacketForm

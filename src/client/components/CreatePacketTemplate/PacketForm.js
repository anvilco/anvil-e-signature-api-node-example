import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormLabel } from 'components/styled'

import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Form from 'components/Form'
import FormField from 'components/FormField'
import Input from 'components/Input'

const PacketForm = ({ submitButtonText = 'Create Signature Packet', onSubmit }) => {
  const [hasTwoSigners, setHasTwoSigners] = useState(false)

  const renderAddSignerButton = () => (
    hasTwoSigners
      ? null
      : (
        <p>
          <Button
            onClick={() => setHasTwoSigners(!hasTwoSigners)}
            type="button"
          >
            {hasTwoSigners ? 'Remove' : 'Add'} Second Signer
          </Button>
        </p>
      )
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
        ? <p />
        : null}

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

const renderSignerFields = ({ prefix, signerLabel, namePlaceholder, emailPlaceholder }) => [
  <FormField
    key={`${prefix}Name`}
    name={`${prefix}Name`}
    label={signerLabel}
  >
    <Input
      required
      placeholder={namePlaceholder}
    />,
  </FormField>,
  <FormField
    name={`${prefix}Email`}
    key={`${prefix}Email`}
  >
    <Input
      required
      placeholder={emailPlaceholder}
    />,
  </FormField>,
  <FormLabel key={`${signerLabel}Options`}>{signerLabel} Options</FormLabel>,
  <Checkbox
    key={`${prefix}SignatureMode`}
    name={`${prefix}SignatureMode`}
    defaultChecked
  >
    Signer draws their signatures <br /><code>signatureMode: 'draw' || 'text'</code>
  </Checkbox>,
  <Checkbox
    key={`${prefix}AcceptEachField`}
    name={`${prefix}AcceptEachField`}
    defaultChecked
  >
    Signer must click each signature block <br /><code>acceptEachField: true || false</code>
  </Checkbox>,
  <Checkbox
    key={`${prefix}EnableEmails`}
    name={`${prefix}EnableEmails`}
    defaultChecked
  >
    Signer receives complete notification email <br /><code>enableEmails: ['etchComplete'] || true || false</code>
  </Checkbox>,
]

PacketForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
}

export default PacketForm

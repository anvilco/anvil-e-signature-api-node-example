import React from 'react'
import PropTypes from 'prop-types'

import Form from 'components/Form'
import FormField from 'components/FormField'
import FileInput from 'components/FileInput'
import Input from 'components/Input'

class NewFileForm extends React.Component {
  render () {
    const { onSubmit } = this.props
    return (
      <Form onSubmit={onSubmit}>
        <FormField name="description">
          <Input
            key="description"
            required
            placeholder="File Description"
            autoFocus
          />,
        </FormField>
        <FormField name="file">
          <FileInput key="file" />,
        </FormField>
      </Form>
    )
  }
}

NewFileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default NewFileForm

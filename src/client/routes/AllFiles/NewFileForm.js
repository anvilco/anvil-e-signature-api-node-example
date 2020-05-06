import React from 'react'
import PropTypes from 'prop-types'

import Form from 'components/Form'
import FormField from 'components/FormField'
import FileInput from 'components/FileInput'

class NewFileForm extends React.Component {
  render () {
    return (
      <Form>
        <FormField name="file">
          <FileInput key="file" />,
        </FormField>
      </Form>
    )
  }
}

NewFileForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
}

export default NewFileForm

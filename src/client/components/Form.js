import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Spinner from 'components/Spinner'
import { Flex } from 'components/styled'

const checkboxNames = ['signerOneSignatureMode', 'signerOneAcceptEachField', 'signerTwoSignatureMode', 'signerTwoAcceptEachField']

class Form extends React.Component {
  state = {
    isSubmitting: false,
    values: {
      signerOneSignatureMode: 'draw',
      signerOneAcceptEachField: true,
      signerOneEnableEmails: true,
      signerTwoSignatureMode: 'draw',
      signerTwoAcceptEachField: true,
      signerTwoEnableEmails: true,
    },
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { values } = this.state
    this.setState({ isSubmitting: true })
    const success = await onSubmit(values)
    if (!success) this.setState({ isSubmitting: false })
  }

  handleChange = async (fieldName, value) => {
    const { values } = this.state
    if (['signerOneSignatureMode', 'signerTwoSignatureMode'].includes(fieldName)) {
      this.setState({
        values: {
          ...values,
          [fieldName]: (value.target.checked === true) ? 'draw' : 'text',
        },
      })
    } else {
      this.setState({
        values: {
          ...values,
          [fieldName]: (value.target?.checked !== undefined) ? value.target.checked : value,
        },
      })
    }
  }

  renderField = (field) => {
    const { values } = this.state
    const name = field.props.name
    if (checkboxNames.includes(name)) {
      return React.cloneElement(field, {
        onChange: (val) => this.handleChange(name, val),
      })
    }
    return React.cloneElement(field, {
      value: values[name],
      onChange: (val) => this.handleChange(name, val),
    })
  }

  render () {
    const { submitButtonText, children } = this.props
    const { isSubmitting } = this.state
    const fields = React.Children.map(children.filter((child) => child), this.renderField)
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {fields}
        <Flex spacing="start">
          <Button
            isSubmit
            type="cta"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </Button>
          {isSubmitting && <Spinner />}
        </Flex>
      </form>
    )
  }
}

Form.defaultProps = {
  submitButtonText: 'Save',
}

Form.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
}

export default Form

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from 'components/Button'
import Spinner from 'components/Spinner'

const ButtonBar = styled.div`
  display: flex;
`

class Form extends React.Component {
  state = {
    isSubmitting: false,
    values: {},
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { onSubmit } = this.props
    const { values } = this.state
    this.setState({ isSubmitting: true })
    await onSubmit(values)
    this.setState({ isSubmitting: false })
  }

  handleChange = async (fieldName, value) => {
    const { values } = this.state
    this.setState({
      values: {
        ...values,
        [fieldName]: value,
      },
    })
  }

  renderField = (field) => {
    const { values } = this.state
    const name = field.props.name
    return React.cloneElement(field, {
      value: values[name],
      onChange: (val) => this.handleChange(name, val),
    })
  }

  render () {
    const { submitButtonText, children } = this.props
    const { isSubmitting } = this.state
    const fields = React.Children.map(children, this.renderField)
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        {fields}
        <ButtonBar>
          <Button
            isSubmit
            type="cta"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </Button>
          {isSubmitting && <Spinner />}
        </ButtonBar>
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

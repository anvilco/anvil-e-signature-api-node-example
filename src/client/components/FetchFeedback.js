import React from 'react'
import PropTypes from 'prop-types'

const FetchFeedback = ({ responses, children }) => {
  const isLoading = responses.reduce((acc, val) => val.isLoading || val.data === undefined || acc, false)
  if (isLoading) {
    return (<div>Loading...</div>)
  }
  return children()
}

FetchFeedback.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
  })).isRequired,
  children: PropTypes.func.isRequired,
}

export default FetchFeedback

import React from 'react'
import Button from 'components/Button'
import Content from 'components/Content'
import { Title, Description, StyledLink } from 'components/styled'
import { parseQueryString } from 'helpers'

const FinishedPage = () => {
  const renderResults = () => {
    const results = parseQueryString()
    const items = []
    for (const key in results) {
      items.push(
        <p><b>{key}:</b> {results[key]}</p>,
      )
    }
    return items
  }

  return (
    <>
      <Title>Embedded Etch</Title>
      <Description>Flexible for any workflow.</Description>
      <Content.Card>
        {renderResults()}
      </Content.Card>
      <Button
        type="danger"
        as={StyledLink}
        to="/"
      >
        Return
      </Button>
    </>
  )
}

export default FinishedPage

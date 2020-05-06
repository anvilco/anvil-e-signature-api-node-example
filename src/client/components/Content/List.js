import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'theme'

export const ListContainer = styled.div`
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 15px 0;
  border-bottom: 2px solid ${theme.colors.blacks[6]};
  &:last-child {
    border-bottom: none;
  }

  > * {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  text-align: right;
  flex-shrink: 0;

  > * {
    margin-left: 8px;
  }

  a svg {
    display: block;
    width: 20px;
    height: 20px;

    path {
      fill: ${theme.textColors.subtle};
      transition: fill .1s ease;
    }
  }

  a:hover {
    path {
      fill: ${theme.colors.textColor};
    }
  }
`

class List extends React.Component {
  componentWillMount () {
    this.cacheSort(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.cacheSort(nextProps)
  }

  cacheSort (props) {
    const { sortBy, items } = props
    if (sortBy) {
      this.cachedItems = _.sortBy(items, sortBy)
    } else {
      this.cachedItems = items
    }
  }

  render () {
    const { renderItem, items, ...others } = this.props
    return (
      <ListContainer {...others}>
        {_.map(items, (item, i) => (
          <ListItem key={i}>
            {renderItem(item, i)}
          </ListItem>
        ))}
      </ListContainer>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
}

List.Actions = Actions

export default List

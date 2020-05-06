import _ from 'lodash'
import React from 'react'
import AllFilesView from './AllFilesView'
import useFetch from 'hooks/useFetch'
import FetchFeedback from 'components/FetchFeedback'

const AllFiles = () => {
  const username = useFetch('api/username')
  const files = useFetch('api/files')

  return (
    <FetchFeedback
      responses={[username, files]}
    >
      {() => (
        <AllFilesView
          files={files.data}
          username={_.get(username, 'data.username')}
        />
      )}
    </FetchFeedback>
  )
}

export default AllFiles

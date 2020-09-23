export const createRequest = ({ url, method, callback }) => {
  return async (data) => {
    const result = await fetch(url, {
      method: method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (callback) callback(result)
  }
}

export const parseQueryString = () => {
  const queryString = window.location.search.replace('?', '')

  const items = queryString.split('&')
  return items.reduce((data, item) => {
    const [key, value] = item.split('=')
    if (data[key] !== undefined) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]]
      }
      data[key].push(value)
    } else {
      data[key] = value
    }
    return data
  }, {})
}

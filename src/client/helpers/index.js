export function createRequest ({ url, method, callback, myData }) {
  return async (formData) => {
    const result = await fetch(url, {
      method: method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: myData ? JSON.stringify(myData) : JSON.stringify(formData),
    })
    if (callback) return await callback(result)
  }
}

export function parseQueryString () {
  const queryString = window.location.search.replace('?', '')

  const items = queryString.split('&')
  return items.reduce((data, item) => {
    let [key, value] = item.split('=')
    key = decodeURIComponent(key)
    value = decodeURIComponent(value)
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

export function buildAnvilURL (url) {
  return window.apiBaseURL + url
}

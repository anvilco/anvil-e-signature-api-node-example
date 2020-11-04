const repoURL = 'https://github.com/anvilco/anvil-e-signature-api-node-example'

export const DocURLs = {
  createEtchPacket: 'https://www.useanvil.com/docs/api/e-signatures#creating-a-signature-packet',
  generateEtchSignURL: 'https://www.useanvil.com/docs/api/e-signatures#controlling-the-signature-process-with-embedded-signers',
  signerOptions: 'https://www.useanvil.com/docs/api/e-signatures#adding-signers',
  routesIndex: `${repoURL}/blob/master/src/server/routes/index.js`,
  repository: repoURL,
}

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
  return window.anvilBaseURL + url
}

export function isDevelopment () {
  return window.environment === 'development'
}

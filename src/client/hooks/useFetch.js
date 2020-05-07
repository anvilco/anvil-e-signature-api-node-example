import { useState, useEffect } from 'react'

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(url, options)
      const json = await res.json()
      setData(json)
      setIsLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return { data, error, isLoading, refetch: fetchData }
}

export default useFetch

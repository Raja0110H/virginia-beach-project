import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [url])
  return data
}

export default useFetch

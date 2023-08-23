import './App.css'
import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import { Audio } from 'react-loader-spinner'
import useFetch from './hooks/useFetch'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const response = useFetch(
    'https://services5.arcgis.com/36soGIYKLrgDhHrr/arcgis/rest/services/VBCPS_School_Property_New/FeatureServer/151/query?outFields=*&where=1%3D1&f=geojson',
  )

  useEffect(() => {
    if (response) {
      setIsLoading(false)
    }
  }, [response])

  return (
    <div className="App">
      {isLoading ? (
        <div data-testid="loading-spinner" className="loading-spinner"></div>
      ) : (
        <Map data={response} />
      )}
    </div>
  )
}

export default App

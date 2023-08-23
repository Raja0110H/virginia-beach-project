import { React, useMemo, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import SubsetInfo from './SubsetInfo'
import { createMapOptions, generatePolygonPath } from '../handlers/mapApiHadler'

export default function Map(props) {
  const { data } = props
  let centerMap = useMemo(() => ({ lat: 36.81, lng: -76.1 }), [])
  let [schoolInfo, showSchoolInfo] = useState(false)

  const closeInfoBox = () => {
    showSchoolInfo(false)
  }

  const mouseOverHandler = (index) => {
    showSchoolInfo([true, index])
  }

  const handleApiLoaded = (map, maps, path, id) => {
    const locationPolygon = new maps.Polygon({
      paths: path,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    })
    locationPolygon.addListener('mouseover', () => {
      mouseOverHandler(id)
    })
    locationPolygon.setMap(map)
  }

  return (
    <div
      style={{
        height: '90vh',
        width: '100%',
      }}
      data-testid="map"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={centerMap}
        defaultZoom={12}
        options={createMapOptions}
        onChildMouseEnter={mouseOverHandler}
        yesIWantToUseGoogleMapApiInternals //this is important!
        onGoogleApiLoaded={({ map, maps }) => {
          data['features']
            .filter(
              (ftData) =>
                ftData['properties']['Capacity_1'] === 'Under Capacity',
            )
            .map((d) => {
              return handleApiLoaded(
                map,
                maps,
                generatePolygonPath(d['geometry']['coordinates'][0]),
                data['features'].indexOf(d),
              )
            })
        }}
      >
        {schoolInfo[0] ? (
          <SubsetInfo
            close={closeInfoBox}
            schoolName={
              data['features'][schoolInfo[1]]['properties']['FULLNAME']
            }
            district={data['features'][schoolInfo[1]]['properties']['DISTRICT']}
            capacity={
              data['features'][schoolInfo[1]]['properties']['Capacity_1']
            }
            address={data['features'][schoolInfo[1]]['properties']['ADDRESS']}
          />
        ) : null}
      </GoogleMapReact>
    </div>
  )
}

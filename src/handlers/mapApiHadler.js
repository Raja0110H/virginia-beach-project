function createMapOptions(maps) {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
    },
    mapTypeControl: true,
  }
}
const generatePolygonPath = (coordinates, id) => {
  const path = coordinates.map((coordinate) => {
    return { lat: parseFloat(coordinate[1]), lng: parseFloat(coordinate[0]) }
  })
  return path
}
export { createMapOptions, generatePolygonPath }

/* global mapboxgl, $ */

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW50ZCIsImEiOiJjaW83enIwNjYwMnB1dmlsejN6cDBzbm93In0.0ZOGwSLp8OjW6vCaEKYFng'

var mbmap = new mapboxgl.Map({
  container: 'map',
  attributionControl: {
    position: 'top-left'
  },
  style: 'mapbox://styles/benjamintd/cir2kh7p0000zbunkj7b3qfmd',
  center: [-122.393423, 37.775638],
  zoom: 17,
  bearing: 0,
  pitch: 45.00
})

var marker
var geolocate = new mapboxgl.Geolocate({ position: 'top-right' })

mbmap.addControl(geolocate)

geolocate.on('geolocate', function (data) {
  console.log('geolocated')
  mbmap.setPitch(45.00)
  createMarker(data.coords.longitude, data.coords.latitude)
})

function easeTo (t) {
  if (marker && t === 1) marker.remove()
  return t * (2 - t)
}

var compass = document.querySelector('.js-compass')
mbmap.on('rotate', function () {
  var rotate = 'rotate(' + (mbmap.transform.angle * (180 / Math.PI)) + 'deg)'
  compass.style.transform = rotate
})

$('.js-compass').on('click', function () {
  mbmap.resetNorth()
})

function createMarker (lng, lat) {
  var markerEl = document.createElement('div')
  var dot = document.createElement('div')
  dot.className = 'waypoint-dot'
  var shadow = document.createElement('div')
  shadow.className = 'waypoint-shadow'
  markerEl.appendChild(dot)
  markerEl.appendChild(shadow)
  marker = new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(mbmap)

  window.setTimeout(function () {
    mbmap.flyTo({
      center: [lng, lat],
      easing: easeTo,
      zoom: 17
    })
  }, 500)
  $.get('/next_loc?lat=' + lat + '&lon=' + lng)
}

function eventMarker (e) {
  createMarker(e.lngLat.lng, e.lngLat.lat)
}

function updateMbMap (lng, lat) {
  mbmap.flyTo({
    center: [lng, lat]
  })
  console.log('Hello, ' + lng + ', ' + lat)
}

mbmap.on('click', eventMarker)

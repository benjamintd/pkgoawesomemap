/* global mapboxgl, mbmap */

var mbmarkers = []
var markerCache = {}

// The following is temporary:
var pklist = [{
  type: 'pokemon',
  key: '124HK43',
  lat: 37.775638,
  lng: -122.393423,
  disappear_time: Date.now() / 1000 + 20,
  icon: 'static/icons/1.png'
}]

function addMarker (item) {
  var pin = document.createElement('div')
  var pkicon = document.createElement('img')
  var timer = document.createElement('div')
  pin.appendChild(pkicon)
  pin.appendChild(timer)
  pin.setAttribute('class', 'pin-pk')
  pkicon.setAttribute('src', item['icon'])
  timer.setAttribute('class', 'label-countdown')
  timer.setAttribute('disappears-at', item['disappear_time'])
  var mbmarker = new mapboxgl.Marker(pin).setLngLat([item['lng'], item['lat']]).addTo(mbmap)
  mbmarker.interactive = true
  mbmarkers.push(mbmarker)
  return mbmarker
}

function setMarkerTimeout (_mbmarker, _disappearsAt, _key) {
  if (_disappearsAt < 0) {
  } else {
    var timeout = setTimeout(function () {
      _mbmarker.remove()
      var i = mbmarkers.indexOf(_mbmarker)
      if (i > -1) mbmarkers.splice(i, 1)
      delete markerCache[_key]
    }, Math.ceil(_disappearsAt))
    _mbmarker.timeout = timeout
  }
  _mbmarker.key = _key
}

function updateMap () {
  var now = new Date()

  for (var i = 0; i < pklist.length; i++) {
    var item = pklist[i]
    var key = item['type'] + item['key']
    if (Object.keys(markerCache).indexOf(key) >= 0) {
      var needs_replacing = false
      if (markerCache[key].item.lat !== item['lat'] || markerCache[key].item.lng !== item['lng']) {
        console.log('Warning: object with identical key has different coordinates please report bug', key)
        needs_replacing = true
      }
      if (markerCache[key].item.type !== item['type']) {
        markerCache[key].mbmarker.remove()
        needs_replacing = true
      }
      if (!needs_replacing) {
        continue
      }
    }
    if (markerCache[key] != null && markerCache[key].mbmarker != null) {
      markerCache[key].mbmarker.remove()
    }

    var disappearsAt

    if (item['disappear_time'] != null) {
      if (parseInt(item['disappear_time'], 10) < 0) {
        disappearsAt = -1
      } else {
        disappearsAt = new Date(parseInt(item['disappear_time'] * 1000, 10)) - now
        if (disappearsAt < 0) {
          continue
        }
      }
    } else {
      disappearsAt = 5500
    }
    var mbmarker = addMarker(item)
    markerCache[key] = {item: item, mbmarker: mbmarker}
    setMarkerTimeout(mbmarker, disappearsAt, key)
  }
}

window.setInterval(updateMap, 1000)

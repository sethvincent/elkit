var mapbox = require('mapbox-gl')

var html = require('../html')
var createComponent = require('../component')

mapbox.accessToken = 'your mapbox access token'

var map = createComponent({
  onLoad: onLoad,
  onUnload: onUnload,
  render: render
})

function onLoad (el, state) {
  if (state.map) {
    state.map.resize()
  }
}

function onUnload (state) {
  if (state.map) {
    state.map.remove()
    state.map = null
  }
}

function render (props, state) {
  var el = html`<div id="map"></div>`

  el.isSameNode = function () {
    return true
  }

  if (!state.map) {
    var map = window.map = state.map = new mapbox.Map({
      container: el,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 6
    })
  }

  if (props.lat && props.long) {
    state.map.panTo([props.long, props.lat])
  }

  return el
}

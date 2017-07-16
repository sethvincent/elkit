var html = require('../html')
var update = require('../update')
var createComponent = require('../component')

var component = createComponent({
  initialize: function (state) {
    state.value = 'message'
  },
  onLoad: function (el, state) {
    console.log('onload')
  },
  onUnload: function (state) {
    console.log('unload')
  },
  beforeRender: function (el, props, state) {
    console.log('beforeRender')
  },
  render: function (props, state) {
    return html`<p id="message">${state.value}: ${props.value}</p>`
  }
})

var el = component.render({ value: 'hi!' })
document.body.appendChild(el)

timedUpdate(el, component.render({ value: '.' }), 300)
timedUpdate(el, component.render({ value: '..' }), 600)
timedUpdate(el, component.render({ value: '...' }), 900)

timedUpdate(el, component.render({ value: 'hola!' }), 1200)

function timedUpdate (el, newEl, amount) {
  setTimeout(function () {
    update(el, newEl)
  }, amount)
}

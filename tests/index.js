var test = require('tape')
var html = require('bel')
var createComponent = require('../component')

test('create and render a component', function (t) {
  var component = createComponent({
    initialize: function (state) {
      state.value = 'message'
      t.ok(true, 'initialize is called')
    },
    render: function (props, state) {
      t.equal(state.value, 'message', 'state.value exists')
      t.ok(props && props.value, 'props.value exists')
      t.ok(true, 'render is called')
      return html`<p>${state.value}: ${props.value}</p>`
    }
  })

  t.equal(component.render({ value: 'hi' }).toString(), '<p>message: hi</p>')
  t.equal(component.render({ value: 'hola' }).toString(), '<p>message: hola</p>')
  t.end()
})

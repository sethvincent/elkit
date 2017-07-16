var test = require('tape')
var html = require('bel')
var input = require('../input')

test('create and render a component', function (t) {
  var el = input({
    type: 'text',
    value: 'example',
    class: 'ok cool nice',
    oninput: function (e) {
      
    }
  })

  console.log(el.toString())
  t.end()
})

var html = require('../html')
var update = require('../update')

var el = html`<h1>hi</h1>`
document.body.appendChild(el)

update(el, html`<h1>hola</h1>`)

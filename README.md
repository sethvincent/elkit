# elkit

## About

A handy toolkit for creating, diffing, and updating html elements with support for building stateful components, this package is a collection of modules including [bel](https://npmjs.com/bel), [nanomorph](https://npmjs.com/nanomorph) & a [component module](component.js).

This collection of modules is what I use for building components for UI projects, but you may prefer to use bel & nanomorph separately, use similar alternatives, or use a different component module like [nanocomponent](https://npmjs.com/nanocomponent).

## Install

```sh
npm install --save elkit
```

## Usage

Create an html element:

```js
var html = require('elkit/html')

var el = html`<p>hi</p>`
```

Update an html element:

```js
var html = require('elkit/html')
var update = require('elkit/update')

var el = html`<p>hi</p>`

update(el, html`<p>hola</p>`)

console.log(el)
// => '<p>hola</p>'
```

Server-side usage:

```js
var html = require('elkit/html')

var el = html`<p>hi</p>`
var str = el.toString() // send this string value in http responses, for example
```

Create stateful components:

```js
var html = require('elkit/html')
var createComponent = require('elkit/component')

var component = createComponent({
  initialize: function (state) {
    state.value = 'message'
  },
  render: function (props, state) {
    return html`<p>${state.value}: ${props.value}</p>`
  }
})

var el = component.render({ value: 'hi!' })

console.log(el)
// => <p>message: hi</p>
```

# Examples

- [Basic usage](examples/basic-usage.js)
- [Component](examples/component.js)

## See also

- elkit is compatible with and shares modules with [choo](https://npmjs.com/choo)
- it's inspired by [yo-yo](https://npmjs.com/yo-yo)
- the `component` module is based in part on [nanocomponent](https://npmjs.com/nanocomponent)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CODE_OF_CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## License

[ISC](LICENSE.md)

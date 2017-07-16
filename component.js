var assert = require('assert')
var onload = require('on-load')

module.exports = function createComponent (options) {
  function Component (options) {
    BaseComponent.call(this, options)
  }

  Component.prototype = Object.create(BaseComponent.prototype)
  Component.prototype.constructor = Component
  Component.prototype._initialize = options.initialize
  Component.prototype._render = options.render
  Component.prototype._beforeRender = options.beforeRender
  Component.prototype._afterRender = options.afterRender
  Component.prototype._update = options.update || defaultUpdate
  Component.prototype._onLoad = options.onLoad
  Component.prototype._onUnload = options.onUnload

  return new Component(options)
}

var counter = 0
var date = new Date().getTime().toString(36);

function createId () {
  return 'elc-' + date + '-' + counter++
}

module.exports.Component = BaseComponent

function BaseComponent (options) {
  this.element = null
  this.id = createId()
  this.state = {}
  this.props = null
  this.oldProps = null
  this.loaded = false
  this._hasWindow = typeof window !== 'undefined'
  this._onloadListener = onload

  if (this._initialize) {
    this._initialize(this.state)
  }
}

BaseComponent.prototype.render = function render (props) {
  assert.equal(typeof this._render, 'function', '_render method is required')
  assert.equal(typeof this._update, 'function', '_update method is required')

  var self = this

  if (this._hasWindow && this.element) {
    this.oldProps = this.props
    this.props = props

    var shouldUpdate = this._update(props, this.oldProps, this.state)

    if (shouldUpdate) {
      if (this._beforeRender) {
        this._beforeRender(this.element, props, this.state)
      }

      this._setId()
      this.element = this._render(props, this.state)

      if (this.afterRender) {
        this._afterRender(this.element, props, this.state)
      }
    }

    return this.element
  } else {
    this.oldProps = this.props
    this.props = props

    if (this._beforeRender) {
      this._beforeRender(this.element, props, this.state)
    }

    this.element = this._render(props, this.state)

    if (this.afterRender) {
      this._afterRender(this.element, props, this.state)
    }

    if (!this._hasWindow) {
      return this.element
    }

    if (this._onLoad) {
      this._onloadListener(this.element, loadHandler, unloadHandler, this)
    }

    function loadHandler () {
      self.loaded = true

      frame(function () {
        self._onLoad(this.element, props, self.state)
      })
    }

    function unloadHandler () {
      self.element = null
      self.loaded = false

      if (self._onUnload) {
        frame(function () {
          self._onUnload(props, self.state)
        })
      }
    }

    this._setId()
    return this.element
  }
}

BaseComponent.prototype._setId = function setId () {
  var id = this.element.getAttribute('id')
  if (!id) return this.element.setAttribute('id', this.id)
  this.id = id
}

function defaultUpdate (newProps, oldProps) {
  if (!newProps || !oldProps) return true

  var oldKeys = Object.keys(oldProps)
  var newKeys = Object.keys(newProps)

  if (oldKeys.length !== newKeys.length) return true

  var i = 0
  var l = oldKeys.length

  for (i; i < l; i++) {
    if (oldProps[oldKeys[i]] !== newProps[oldKeys[i]]) {
      return true
    }
  }

  return false
}

function frame (cb) {
  window.requestAnimationFrame(cb)
}

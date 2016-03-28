var colors = require('./colors.js')

// Color palette
exports.colorDarkRed = function () { return new Color('#ed6a5a') }
exports.colorDarkOrange = function () { return new Color('#ed995a') }
exports.colorDarkBlue = function () { return new Color('#9bc1bc') }
exports.colorDarkTurquoise = function () { return new Color('#36c9c6') }
exports.colorDarkGreen = function () { return new Color('#8ad5a5') }
exports.colorLightYellow = function () { return new Color('#f4f1bb') }
exports.colorLightGainsboro = function () { return new Color('#e6ebe0') }

// Font colors
exports.fontColorDark100 = function () { return new Color('#3e4548') }
exports.fontColorDark90 = function () { return new Color('#576166') }
exports.fontColorDark80 = function () { return new Color('#6f7c82') }
exports.fontColorLight100 = function () { return new Color('#ffffff') }
exports.fontColorLight90 = function () { return new Color('#e1e1e1') }
exports.fontColorLight80 = function () { return new Color('#c1c1c1') }

// Font weight
exports.fontWeight110 = function () { return 600 }
exports.fontWeight100 = function () { return 400 }
exports.fontWeight90 = function () { return 300 }
exports.fontWeight80 = function () { return 100 }

// Font size
exports.fontSize100 = function () { return new FontSize(46) }
exports.fontSize90 = function () { return new FontSize(36) }
exports.fontSize80 = function () { return new FontSize(20) }
exports.fontSize70 = function () { return new FontSize(18) }
exports.fontSize60 = function () { return new FontSize(16) }
exports.fontSize50 = function () { return new FontSize(14) }

function FontSize (size) {
  this.size = size
}

FontSize.prototype.toString = function () {
  return this.size
}

FontSize.prototype.px = function () {
  return this.size + 'px'
}

function Color (hex) {
  this.hex = hex
}

Color.prototype.toString = function () {
  return this.hex
}

Color.prototype.rgb = function () {
  return colors.hexToRgb(this.hex)
}

Color.prototype.hex = function () {
  return this.hex
}

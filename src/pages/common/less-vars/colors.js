exports.hexToRgb = function (hex) {
  // Remove non-hex chars (like a leading #)
  hex = hex.replace(/[^0-9A-F]/gi, '')

  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

exports.rgbToHex = function (r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

exports.lighten = function (color, percent) {
  color = '' + color

  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  let f = parseInt(color.slice(1), 16)
  let t = percent < 0 ? 0 : 255
  let p = percent < 0 ? percent * -1 : percent
  let R = f >> 16
  let G = f >> 8 & 0x00FF
  let B = f & 0x0000FF
  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

exports.darken = function (color, percent) {
  percent = -percent
  color = '' + color

  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  let f = parseInt(color.slice(1), 16)
  let t = percent < 0 ? 0 : 255
  let p = percent < 0 ? percent * -1 : percent
  let R = f >> 16
  let G = f >> 8 & 0x00FF
  let B = f & 0x0000FF
  return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

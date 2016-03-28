'use strict'

let $ = require('jQuery/dist/jquery')
$('[name=email]').focus()

$('#signin-form').submit(function (event) {
  event.preventDefault()
  var email = $('[name=email]').val()
  var password = $('[name=password]').val()

  $.post('/signin', {email: email, password: password})
    .done(function (data) {
      window.location = '/account'
    })
    .fail(function (data) {
      try {
        data = JSON.parse(data.responseText)
      } catch (e) {
        console.error(e)
      }
      var firstError = data.errors[0]
      window.alert(firstError.msg || firstError.password || firstError.email)
    })
})

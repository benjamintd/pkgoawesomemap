/* global $ */

var setLabelTime = function () {
  $('.label-countdown').each(function (index, element) {
    var disappearsAt = new Date(parseInt(element.getAttribute('disappears-at'), 10) * 1000)
    var now = new Date()

    var difference = Math.abs(disappearsAt - now)
    var hours = Math.floor(difference / 36e5)
    var minutes = Math.floor((difference - (hours * 36e5)) / 6e4)
    var seconds = Math.floor((difference - (hours * 36e5) - (minutes * 6e4)) / 1e3)
    var timestring
    if (disappearsAt < now) {
      timestring = '(expired)'
    } else {
      timestring = ''
      if (hours > 0) timestring = hours + 'h'

      timestring += ('0' + minutes).slice(-2) + ':'
      timestring += ('0' + seconds).slice(-2)
    }
    $(element).text(timestring)
  })
}

window.setInterval(setLabelTime, 1000)

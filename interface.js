'use strict'
/* global $ */

const canonburyStn = '910GCNNB' // Canonbury Overground
const aberdeenBus = '490003053S' // Highbury Grove School / Aberdeen Park (CZ)

window.onload = () => {
  $.getJSON(`https://api.tfl.gov.uk/StopPoint/${canonburyStn}/arrivals`, (data) => {
    let minExpected = 0
    let message = ''

    for (let i = 0; i < data.length; i++) {
      var platform = data[i].platformName
      var expected = new Date(data[i].expectedArrival)
      var timeToStation = data[i].timeToStation
      console.log(platform, toMinutes(timeToStation))

      if (
        platform === 'Platform 2' &&
        (
          expected < minExpected ||
          minExpected === 0
        )
      ) {
        message = `${data[i].destinationName} in ${toMinutes(timeToStation)} min on ${platform}`
        minExpected = expected
      }
    }

    document.getElementById('overground').innerHTML = message
  })
}

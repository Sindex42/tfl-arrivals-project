'use strict'
/* global $ */

const url = 'https://api.tfl.gov.uk/StopPoint'

const canonburyStn = '910GCNNB' // Canonbury Overground
const platformNr = 2 // Southbound to Crystal Palace/West Croydon

const aberdeenBus = '490003053S' // Highbury Grove School / Aberdeen Park (CZ)
const busLine = '4'

window.onload = () => {
  $.getJSON(`${url}/${canonburyStn}/arrivals`, (data) => {
    let minExpected = 0
    let message = ''

    for (let i = 0; i < data.length; i++) {
      var platform = data[i].platformName
      var expected = new Date(data[i].expectedArrival)
      var timeToStation = data[i].timeToStation
      console.log(platform, toMinutes(timeToStation))

      if (platform !== `Platform ${platformNr}`) { continue }
      if (expected < minExpected || minExpected === 0) {
        message = `Next Southbound in ${toMinutes(timeToStation)} min`
        minExpected = expected
      }
    }

    document.getElementById('overground').innerHTML = message
  })

  $.getJSON(`${url}/${aberdeenBus}/arrivals`, (data) => {
    let minExpected = 0
    let message = ''

    for (let i = 0; i < data.length; i++) {
      var lineName = data[i].lineName
      var expected = new Date(data[i].expectedArrival)
      var timeToStation = data[i].timeToStation
      console.log(lineName, toMinutes(timeToStation))

      if (lineName !== busLine) { continue }
      if (expected < minExpected || minExpected === 0) {
        message = `Next ${busLine} Bus in ${toMinutes(timeToStation)} min`
        minExpected = expected
      }
    }

    document.getElementById('bus').innerHTML = message
  })
}

var request = require('request')
  , moment = require('moment-range')

function getDate(str) {
  var year = str.charAt(0) + str.charAt(1) + str.charAt(2) + str.charAt(3)
    , month = str.charAt(4) + str.charAt(5)
    , day = str.charAt(6) + str.charAt(7)
    , date = new Date(year, month - 1, day)

  return date
}

module.exports = function (cb) {
  request.get(process.env.HOLIDAY_API_URL, function (error, res) {
    if (error) return cb(error)

    var matches = res.body.split(/BEGIN:VEVENT/g)
      , holidays = []
      , now = new Date()

    matches.shift()

    matches.forEach(function (match) {
      var data = match.split(/\r\n/g)
        , startDate = data[1].trim().replace('DTSTART;VALUE=DATE:', '')
        , endDate = data[2].trim().replace('DTEND;VALUE=DATE:', '')
        , who = data[5] ? data[5].trim().replace('SUMMARY:Holiday (', '').replace(')', '') : ''


      startDate = getDate(startDate)
      endDate = getDate(endDate)

      if (startDate <= now && endDate >= now) {
        holidays.push({ name : who, duration: moment().range(startDate, endDate) })
      }

    })

    cb(null, holidays)
  })
}

module.exports = processSpreadsheet

var _ = require('lodash')
  , moment = require('moment-range')

function processSpreadsheet(rows) {
  // Delete header row
  delete rows['1']

  // Extract required fields from spreadsheet rows
  var employees = _.compact(Object.keys(rows).map(function (row) {
    row = rows[row]
    var absence = { name: row['1'], start: row['2'], end: row['3'], duration: row['4'], image: row['7'] }
    return isAbsenceToday(absence) ? absence : null
  }))

  employees.sort(function (a, b) {
    return a.duration < b.duration
  })

  return employees
}

function isAbsenceToday(absence) {
  var today = moment().toDate()
    , start = moment(absence.start, "DD/MM/YYYY").startOf('day')
    , end = moment(absence.end, "DD/MM/YYYY").endOf('day')
    , range = moment().range(start, end)

  absence.start = start.toDate()
  absence.end = end.toDate()

  return range.contains(today)
}

// Google spreadsheet date pickers internally store an integer
// which appears to be a number of days that has passed since
// Sat Dec 30 1899. The integer that is returned is added to
// the base date to get the date it is referring to
//
// This is weird and undocumented and could potentially break.
// Another solution is to use plain text on google docs and not
// the datepicker
function googleDateValueToDate(value) {
  value = moment(value, "DD/MM/YYYY")
  var date = moment('Sat Dec 30 1899 00:00:00 GMT+0000 (GMT)')

  date.add(value, 'days')
  return date.toDate()
}

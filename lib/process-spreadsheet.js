module.exports = processSpreadsheet

var _ = require('lodash')

function processSpreadsheet(rows) {
  // Delete header row
  delete rows['1']

  // Extract required fields from spreadsheet rows
  var employees = _.groupBy(Object.keys(rows).map(function (row) {
    row = rows[row]
    return { name: row['1'], duration: row['4'] }
  }), 'name')

  // Create a cumulative total of the number of days for each employee
  // and sort highest first
  var cumulativeEmployees = _.map(employees, function (employee, key) {
    return {
        name: key
      , duration: employee.reduce(function (x, y) {
          return x + y.duration
        }, 0)
      }
  }).sort(function (a, b) {
    return a.duration < b.duration
  })

  return cumulativeEmployees
}

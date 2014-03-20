var Widget = new require('hud-widget')
  , widget = new Widget()
  , _ = require('lodash')
  , getSpreadsheet = require('./lib/get-spreadsheet')
  , processSpreadsheet = require('./lib/process-spreadsheet')
  , getHolidays = require('./lib/get-holidays')
  , absenceOptions =
    { debug: true
    , oauth:
      { email: process.env.EMAIL_ADDRESS
      , keyFile: process.env.PRIVATE_KEY
      }
    , spreadsheetId: process.env.SPREADSHEET_ID
    , worksheetId: process.env.WORKSHEET_ID
    }
  , employeeImageOptions =
    { debug: true
    , oauth:
      { email: process.env.EMAIL_ADDRESS
      , keyFile: process.env.PRIVATE_KEY
      }
    , spreadsheetId: process.env.SPREADSHEET_ID
    , worksheetId: process.env.EMPLOYEE_WORKSHEET
    }
  , employeeImages = {}

// Uncomment for testing purposes so that the spreadsheet gets loaded
// when the app runs
// getSpreadsheet(function (err, spreadsheet) {
//   console.log(processSpreadsheet(spreadsheet));
// })

getSpreadsheet(employeeImageOptions, function (error, spreadsheet) {
  if (error) return console.error(error)

  _.each(spreadsheet, function (data) {
    employeeImages[data['1']] = data['2']
  })
})

widget.get('/', function (req, res) {
  getSpreadsheet(absenceOptions, function (error, spreadsheet) {
    if (error) {
      console.error(error)
      return res.send(500, { error: error })
    }

    getHolidays(function (error, holidays) {
      if (error) {
        console.error(error)
        return res.send(500, { error: error })
      }

      res.render('index', { absences: processSpreadsheet(spreadsheet)
        , holidays: holidays, employeeImages: employeeImages })
    })

  })
})

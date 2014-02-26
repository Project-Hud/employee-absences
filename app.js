
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , _ = require('lodash')
  , getSpreadsheet = require('./lib/get-spreadsheet')
  , processSpreadsheet = require('./lib/process-spreadsheet')
  , getHolidays = require('./lib/get-holidays')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

var absenceOptions =
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

app.get('/', function (req, res) {
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})

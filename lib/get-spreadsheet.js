module.exports = getSpreadsheet

var gspreadSheet = require('edit-google-spreadsheet')

function getSpreadsheet(cb) {

  gspreadSheet.create(
    { debug: true
    , oauth:
      { email: process.env.EMAIL_ADDRESS
      , keyFile: process.env.PRIVATE_KEY
      }
    , spreadsheetId: process.env.SPREADSHEET_ID
    , worksheetId: process.env.WORKSHEET_ID
    , callback: sheetReady
    })

  function sheetReady(err, spreadsheet) {
    if(err) return cb(err)

    spreadsheet.receive(function(err, rows) {
      if(err) return cb(err)

      cb(null, rows)
    })
  }

}

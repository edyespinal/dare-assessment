const express = require('express')
const { errorHandler } = require('./helpers/error')
const app = express()

// use routes (testing purposes only)
app.use('/', require('./routes'))

// error handling
app.use((req, res, next) => {
  const err = new Error()
  err.status = 500
  err.message = 'Something went wrong'
  next({
    status: err.status,
    message: err.message,
  })
})
app.use(errorHandler)

// start the server
app.listen(process.env.PORT)

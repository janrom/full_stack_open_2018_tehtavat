if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// development config
let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI

// test config
if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
  port,
  mongoUrl
}
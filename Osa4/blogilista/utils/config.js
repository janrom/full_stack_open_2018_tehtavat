// TODO: do not load .env file in production mode
require('dotenv').config()

let mongourl = process.env.MONGODB_URI
let port = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  mongourl = process.env.TEST_MONGODB_URI
  port = process.env.TEST_PORT
  console.log('using test database config')
}

module.exports = {
  mongourl,
  port
}

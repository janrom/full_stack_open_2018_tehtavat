const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const utils = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose
  .connect(config.mongourl, { 'useNewUrlParser': true })
  .then(() => console.log('connected to database'))
  .catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(utils)
app.use('/api/blogs', blogsRouter) // routes, using /api/blogs as base url

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}

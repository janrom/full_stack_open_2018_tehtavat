const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { logger, unknownRoute } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')

// database connection
mongoose
  .connect(config.mongourl, { 'useNewUrlParser': true })
  .then(() => console.log('connected to database'))
  .catch(err => {
    console.log(err)
  })

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(logger)

// routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownRoute)

// server settings
const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

// exports
module.exports = {
  app,
  server
}

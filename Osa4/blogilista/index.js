const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const utils = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config() // load environment variables from .env file

app.use(cors())
app.use(bodyParser.json())
app.use(utils)
app.use('/api/blogs', blogsRouter) // routes, using /api/blogs as base url

mongoose
  .connect(process.env.MONGODB_URL, { "useNewUrlParser": true })
  .then(() => console.log('connected to database'))
  .catch(err => {
    console.log(err)    
  })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
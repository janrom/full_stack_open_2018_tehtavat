const mongoose = require('mongoose')
const fs = require('fs')

var data = fs.readFileSync('dbconf', 'utf-8')
data = data.split(':')
const usr = data[1]
const pass = data[3].substring(0, data[3].length - 1)

// create url to MongoDB database notes in mLab
const url = 'mongodb://' + usr + ':' + pass + '@ds157834.mlab.com:57834/notes'

// open connection to database
mongoose.connect(url)

// create a model. schema is defined in second parameter. 
const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Note

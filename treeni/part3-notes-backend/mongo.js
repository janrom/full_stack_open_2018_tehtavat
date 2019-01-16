const mongoose = require('mongoose')
const fs = require('fs')

var data = fs.readFileSync('dbconf', 'utf-8')
data = data.split(':')
const usr = data[1]
const pass = data[3].substring(0, data[3].length - 1)

// yhteys cLabissa olevaan tietokantaan notes
const url = 'mongodb://' + usr + ':' + pass + '@ds157834.mlab.com:57834/notes'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'testi',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved')
    mongoose.connection.close()
  })

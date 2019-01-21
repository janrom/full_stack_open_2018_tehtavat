const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Note = require('./models/note')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

const formatNote = (note) => {
  return {
    content: note.content,
    date: note.date,
    important: note.important,
    id: note._id
  }
} 

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note
    .find({})
    .then(notes => {
      if (notes) {
        res.json(notes.map(formatNote))
      } else {
        response.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      response.status(400).send({ error: 'malformatted request' })
    })
})

app.get('/api/notes/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(formatNote(note))
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note
    .save()
    .then(savedNote => {
      response.json(formatNote(savedNote))
    })
    .catch(err => {
      console.log(err)
      response.status(500).end()
    })
})

app.delete('/api/notes/:id', (request, response) => {
  Note
    .findByIdAndRemove(request.params.id)
    .then(resut => {
      response.status(204).end()
    })
    .catch(err => {
      console.log(err)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.put('/api/notes/:id', (req, res) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note
    .findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(formatNote(updatedNote))
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

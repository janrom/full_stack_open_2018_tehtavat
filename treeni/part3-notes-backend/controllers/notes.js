const notesRouter = require('express').Router()
const Note = require('../models/note')

const formatNote = (note) => {
  return {
    content: note.content,
    date: note.date,
    important: note.important,
    id: note._id
  }
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes.map(formatNote))
})

notesRouter.get('/:id', (req, res) => {
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

notesRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date()
    })

    const savedNote = await note.save()
    response.json(formatNote(savedNote))
  } catch(ex) {
    console.log(ex)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

notesRouter.put('/:id', (req, res) => {
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

notesRouter.delete('/:id', (request, response) => {
  Note
    .findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      }
    })
    .catch(err => {
      console.log(err)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = notesRouter
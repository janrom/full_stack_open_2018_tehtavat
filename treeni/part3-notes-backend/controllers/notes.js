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

notesRouter.get('/', (req, res) => {
  Note
    .find({})
    .then(notes => {
      if (notes) {
        res.json(notes.map(formatNote))
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted request' })
    })
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

notesRouter.post('/', (request, response) => {
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
    .then(formatNote) // call formatNote with result from .save() as parameter and return formatted json as Promise (.then always returns Promise)
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
    .catch(err => {
      console.log(err)
      response.status(500).end()
    })
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
    .then(response.status(204).end())
    .catch(err => {
      console.log(err)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = notesRouter
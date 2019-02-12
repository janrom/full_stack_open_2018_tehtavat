const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })

  res.json(notes.map(Note.format))
})

notesRouter.get('/:id', (req, res) => {
  Note
    .findById(req.params.id)
    .then(note => {
      if (note) {        
        res.json(Note.format(note))
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    })
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(body.userId)

    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      date: new Date(),
      user: user._id
    })

    const savedNote = await note.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(Note.format(savedNote))
  } catch(ex) {
    if (ex.name === 'JsonWebTokenError') {
      response.status(401).json({ error: ex.message })
    } else {
      console.log(ex)
      response.status(500).json({ error: 'something went wrong...' })
    }
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
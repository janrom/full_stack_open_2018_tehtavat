const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .catch(err => {
      console.log(err)
      return res.status(500).end()
    })

  res.status(200).json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  try {
    if ( !req.body.username || !req.body.password || !req.body.name ) {
      return res.status(400).json({ error: 'username, password and name are mandatory fields' })
    } else if (req.body.password.length < 3) {
      return res.status(400).json({ error: 'password is too short' })
    }

    if (!req.body.isAdult) {
      req.body.isAdult = true
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const userBody = {
      username: req.body.username,
      name: req.body.name,
      isAdult: req.body.isAdult,
      passwordHash
    }

    const newUser = new User(userBody)

    const savedUser = await newUser.save()

    return res.status(201).json(User.format(savedUser))
  } catch(err) {
    // duplicate username
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ error: 'username already taken' })
    } else {
      console.log(err)
      res.status(500).end()
    }
  }
})

module.exports = usersRouter

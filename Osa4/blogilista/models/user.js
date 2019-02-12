const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true } },
  name: String,
  isAdult: Boolean,
  passwordHash: String
})

userSchema.statics.format = (user) => {
  return ({
    id: user._id,
    username: user.username,
    name: user.name,
    isAdult: user.isAdult
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User

const logger = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }
  console.log('METHOD:', req.method)
  console.log('URL:', req.url)
  console.log('BODY:', req.body)
  console.log('------')

  next()
}

const unknownRoute = (req, res) => {
  return res.status(400).json({ error: 'unknown endpoint' })
}

module.exports = {
  logger,
  unknownRoute
}

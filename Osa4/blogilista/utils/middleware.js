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

module.exports = logger

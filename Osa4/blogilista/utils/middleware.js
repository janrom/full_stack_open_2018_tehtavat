const logger = (req, res, next) => {  
  console.log('METHOD:', req.method)
  console.log('URL:', req.url)
  console.log('BODY:', req.body)  
  console.log('------')

  next()
}

module.exports = logger
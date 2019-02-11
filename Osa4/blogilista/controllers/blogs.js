const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/**
 * Get all blogs from database
 * @param {object} request - Express request object. Not used
 * @param {object} response - Express request object
 * @returns {JSON} - All blogs or error status
 */
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .catch(err => {
      console.log(err)
      response(500).end()
    })

  response.json(blogs)
})

/**
 * Save a blog to database
 * @param {object} request - request.body holds a blog to be saved in database
 * @param {object} response - Express response object
 * @returns {JSON} - HTTP response with JSON, holding created blog document or error message
 */
blogsRouter.post('/', async (request, response) => {
  const blog = request.body

  // mandatory fields
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  // defaults for missing fields
  if (!blog.likes) {
    blog.likes = 0
  }

  const blogDocument = new Blog(blog)
  const savedBlogDocument = await blogDocument
    .save()
    .catch(err => {
      console.log(err)
      return response.status(500).json({ error: 'failed to save blog' })
    })

  response.status(201).json(savedBlogDocument)
})

/**
 * Delete single blog by id
 * @param {object} request - request.params.id holds id of a blog to be deleted
 * @param {object} response - Express response object
 * @returns {object} - status code on success, status code and JSON on error
 * */
blogsRouter.delete('/:id', async (request, response) => {
  await Blog
    .findByIdAndRemove(request.params.id)
    .catch(err => {
      console.log(err)
      return response(400).json({ error: 'incorrect id' })
    })

  response.status(204).end()
})

module.exports = blogsRouter

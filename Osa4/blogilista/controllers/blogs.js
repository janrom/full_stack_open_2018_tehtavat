const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

/**
 * Save array of blog(s) to database
 * @param {object} request - request.body holds single blog or array of blogs to be saved in database
 * @param {object} response - HTTP response with JSON, holding created blog documents or error message
 */
blogsRouter.post('/', (request, response) => {
  // handle only arrays. push single blog objects to array
  let blogData = []
  if (!request.body.length) {
    blogData.push(request.body)
  } else {
    blogData = request.body
  }

  const createdBlogs = blogData.map(blog => {
    // mandatory fields
    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    // if likes field is missing, add default field
    if (!blog.likes) {
      blog.likes = 0
    }

    // save blog document
    const blogDocument =  new Blog(blog)
    blogDocument
      .save()
      .catch(err => {
        console.log(err)
        return response(500).json({ error: 'failed to save blog document in POST /api/blogs' })
      })

    return blogDocument
  })

  response.status(201).json(createdBlogs)
})

module.exports = blogsRouter

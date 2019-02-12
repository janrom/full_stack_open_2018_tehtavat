const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'initial blog 1',
    author: 'jest',
    url: 'http://localhost/api/blogs',
    likes: 1
  },
  {
    title: 'initial blog 2',
    author: 'jest',
    url: 'http://localhost/api/blogs',
    likes: 1
  }
]

const deleteBlogsInDb = async () => {
  await Blog.deleteMany({})
}

const deleteUsersInDb = async () => {
  await User.deleteMany({})
}

/**
 * Seed test database with initial blogs
 * @returns {object, null} - returns saved blog documents or null if save failed
 */
const seedBlogs = () => {
  const blogDocuments = initialBlogs.map(b => new Blog(b))

  const savedBlogDocuments = blogDocuments.map(async blog => {
    await blog
      .save()
      .catch(err => {
        console.log(err)
        return null
      })
  })

  return Promise.all(savedBlogDocuments)
}

const getAllBlogsFromDb = async () => {
  const blogs = await Blog.find({})

  return blogs
}

module.exports = {
  initialBlogs,
  deleteBlogsInDb,
  deleteUsersInDb,
  seedBlogs,
  getAllBlogsFromDb
}
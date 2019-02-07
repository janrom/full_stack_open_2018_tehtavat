const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('HTTP tests', () => {
  test('blocks are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('new blog is added', async () => {
    const newBlog = {
      'title': 'test blog',
      'author': 'supertest post request',
      'url': 'http://localhost',
      'likes': 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)      

    const response = await api.get('/api/blogs')
    const blogTitles = response.body.map(r => r.title)
    expect(blogTitles).toContainEqual(newBlog.title)
  })
})

describe('blog consistency tests', () => {
  beforeEach(async () => {
    const Blog = require('../models/blog')
    await Blog.remove({})
  })

  test('if likes-field is missing, default likes-field with zero likes is added', async () => {
    const newBlogWithNoLikes = {
      'title': 'test missing likes',
      'author': 'jest',
      'url': 'http://localhost'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body
    expect(likes).toContainEqual(expect.objectContaining(
      { 'likes': expect.any(Number) }
    ))
  })

  test('if title-field is missing, response status is 400 Bad request, ', async () => {
    const newBlogWithNoTitle = {
      'author': 'jest',
      'url': 'http://localhost',
      'likes': 1
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithNoTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('if url-field is missing, response status is 400 Bad request', async () => {
    const newBlogWithNoTitle = {
      'title': 'test missing url',
      'author': 'jest',
      'likes': 1
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithNoTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
})

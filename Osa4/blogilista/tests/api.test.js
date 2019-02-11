const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { clearDb, seedDb, getAllBlogsFromDb } = require('./test_helper')

describe('test HTTP methods on /api/blogs route', () => {
  beforeEach(async () => {
    await clearDb()
    const seedResult = await seedDb()
    expect(seedResult).not.toBe(null)
  })

  test('GET /api/blogs returns all blogs', async () => {
    const initialBlogs = await getAllBlogsFromDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('POST /api/blogs creates new blog with valid values', async () => {
    const initialBlogs = await getAllBlogsFromDb()

    const newBlog = {
      title: 'new blog',
      author: 'jest',
      url: 'http://localhost',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await getAllBlogsFromDb()
    const blogTitles = blogsAfterOperation.map(b => b.title)
    expect(blogTitles).toContain(newBlog.title)

    expect(blogsAfterOperation.length).toBe(initialBlogs.length + 1)
  })

  test('DELETE /api/blogs/:id removes blog with matching id', async () => {
    const initialBlogs = await getAllBlogsFromDb()
    let id = initialBlogs[0]._id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsAfterOperation = await getAllBlogsFromDb()

    expect(blogsAfterOperation).not.toContain(initialBlogs[0]._id)
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
    expect(response.body).toContainEqual(expect.objectContaining(
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
    const newBlogWithNoUrl = {
      'title': 'test missing url',
      'author': 'jest',
      'likes': 1
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithNoUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  server.close()
})

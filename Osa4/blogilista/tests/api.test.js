const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { deleteBlogsInDb, deleteUsersInDb, seedBlogs, getAllBlogsFromDb } = require('./test_helper')

describe('test HTTP methods on /api/blogs route', () => {
  beforeEach(async () => {
    await deleteBlogsInDb()
    const seedResult = await seedBlogs()
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

  test('PUT /api/blogs/:id updates existing blog with matching id', async () => {
    const initialBlogs = await getAllBlogsFromDb()
    const id = initialBlogs[0]._id

    const updatedBlog = {
      _id: id,
      title: 'initial blog 1 updated',
      author: 'jest updated',
      url: 'http://localhost/api/blogs/updated',
      likes: 2
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)    

    const blogsAfterOperation = await getAllBlogsFromDb()
    expect(blogsAfterOperation).toContainEqual(expect.objectContaining(updatedBlog))
  })
})

describe('blog consistency tests', () => {
  beforeEach(async () => {
    await deleteBlogsInDb()
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

describe.only('user creation tests', async () => {
  beforeEach(async () => {
    await deleteUsersInDb()
  })

  test('user creation fails with password length of 2', async () => {
    const newUser = {
      username: 'fail',
      password: 'aa',
      name: 'Password test',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user creation success with password length of 3', async () => {
    const newUser = {
      username: 'success',
      password: 'aaa',
      name: 'Password test',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const response = await api.get('/api/users')
    const usernames = response.body.map(r => r.username)

    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails with non-unique username', async () => {
    const newUser = {
      username: 'user',
      password: 'aaa',
      name: 'Password test',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const identicalUser = {
      username: 'user',
      password: 'aaa',
      name: 'Password test',
      adult: true
    }

    await api
      .post('/api/users')
      .send(identicalUser)
      .expect(400)
  })

  test('if adult field is missing, default field is added with value true', async () => {
    const newUser = {
      username: 'user',
      password: 'aaa',
      name: 'Password test'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    expect(response.body.isAdult).toBe(true)
  })
})

afterAll(() => {
  server.close()
})

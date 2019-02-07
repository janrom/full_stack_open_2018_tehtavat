const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc.likes > cur.likes ? acc : cur
  }, blogs[0])
}

/**
 * Find author with most blogs and return the author's name and number of blogs
 * @param {object} blogs
 */
const mostBlogs = (blogs) => {
  let most = { author: '', blogs: 0 }

  blogs.reduce((acc, cur) => {
    const result = blogs.filter(blog => blog.author.indexOf(cur.author) > -1)
    if (most.blogs < result.length) {
      most.author = result[0].author
      most.blogs = result.length
    }
  }, blogs[0])

  return most
}

/**
 * Find author with most likes and return author's name and number of likes
 * @param {object} blogs
 */
const mostLikes = (blogs) => {
  let most = { author: '', likes: 0 }

  blogs.reduce((acc, cur) => {
    const result = blogs.filter(blog => blog.author.indexOf(cur.author) > -1)
    const likes = result.reduce((acc, cur) => {
      return acc + cur.likes
    }, 0)
    if (likes > most.likes && result[0].author !== most.author) {
      most.author = result[0].author
      most.likes = likes
    }
  }, blogs[0])

  return most
}

const missingLikes = (blogs) => {
  let total = blogs.reduce((acc, cur) => {
    let likes = cur.likes ? cur.likes : 0
    return acc + likes
  }, 0)

  return total
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  missingLikes
}

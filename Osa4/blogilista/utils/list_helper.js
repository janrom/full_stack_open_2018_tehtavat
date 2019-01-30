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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
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

const mostBlogs = (blogs) => {
  let authors = []

  // push authors to array and count their blog occurences
  blogs.reduce((acc, cur) => {
    let result = authors.filter(a => a.author.indexOf(cur.author) > -1)    
    
    if (result.length > 0) {
      result.map((a) => {
        if (a => a.author.indexOf(cur.author) > -1) {
          a.blogs++  
        }
      })
    } else {
      authors.push({
        author: cur.author,
        blogs: 1
      })
    }

    return authors
  }, blogs[0])
    
  // sort author with most blog occurences into first index
  authors.sort((a,b) => {
    if (a.blogs > b.blogs) {
      return -1
    }
    if (a.blogs < b.blogs) {
      return 1
    }
    return 0
  })  
    
  return authors[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
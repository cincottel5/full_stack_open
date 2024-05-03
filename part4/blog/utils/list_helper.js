const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (favorite, item) => {
    if (favorite == null) return item

    return item.likes > favorite.likes 
      ? item
      : favorite
  }

  return blogs.reduce(reducer, null)
}

const mostBlogs = blogs => {
  const authors = _.groupBy(blogs, 'author')
  const authorsMap = Object.entries(authors)
    .map(([key, value])=> ({
      author: key, 
      blogs: value.length
    }))

  return _.maxBy(authorsMap, 'blogs')
}

const mostLikes = blogs => {
  const authors = _.groupBy(blogs, 'author')
  const authorsMap = Object.entries(authors)
    .map(([key, value])=> ({ 
      author: key, 
      likes: _.sumBy(value, 'likes')
    }))

  return _.maxBy(authorsMap, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
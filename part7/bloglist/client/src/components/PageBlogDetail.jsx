import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import NotFound from "./NotFound"
import BlogCommentForm from "./BlogCommentForm"
import useBlog from "../hooks/blog"

const PageBlogDetail = () => {
  const match = useMatch('/blogs/:id')

  const blog = match 
    ? useSelector(state => state.blogs.find(b => b.id === match.params.id))
    : null

  if (!blog) return <NotFound/>
  
  const blogHook = useBlog(blog)

  return (
    <>
      <h2>
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>
      </h2>
      <div className="blog-url"><a href={blog.url}>{blog.url}</a></div>
      <div className="blog-likes">
        {blogHook.blogLikes} likes
        <button type="button" className="like-btn" onClick={blogHook.likeBlogHandle}>
          like
        </button>
      </div>
      <div>added by {blog.user?.name}</div>
      { blogHook.isRemovable() && 
        <button onClick={blogHook.removeBlogHandler}>remove</button>
      }

      <h3>comments</h3>
      <BlogCommentForm addCommentHandle={blogHook.addCommentHandle}/>
      <ul>
        { blogHook.blogComments.map( (comment, index) => 
          <li key={index}>{comment}</li>
        )}
      </ul>
    </>
  )
}

export default PageBlogDetail
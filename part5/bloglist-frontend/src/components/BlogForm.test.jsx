import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import BlogService from '../services/blogs'
import { expect } from 'vitest'

describe('<BlogForm/>', () => {

  const defaultBlog = {
    url: 'test-blog.com',
    title: 'A test blog title',
    author: 'Yelko Carvajal',
    likes: 10
  }

  test('Form submits the correct info', async () => {
    vi.spyOn(BlogService, 'create').mockImplementation(() => 
      new Promise((resolve, reject) => {
        resolve(defaultBlog)
    }))

    const addBlog = vi.fn()

    const { container} = render(<BlogForm addBlog={addBlog}/>)

    const titleInput = container.querySelector('#blog-input-title')
    const authorInput = container.querySelector('#blog-input-author')
    const urlInput = container.querySelector('#blog-input-url')
    const button = screen.queryByText('create')

    const user = userEvent.setup()
    await user.type(titleInput, defaultBlog.title)
    await user.type(authorInput, defaultBlog.author)
    await user.type(urlInput, defaultBlog.url)

    await user.click(button)
  
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(defaultBlog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(defaultBlog.author)
  })
})
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogService from '../services/blogs'
import { expect } from 'vitest'

describe('<Blog />', () => {
  const defaultBlog = {
    url: 'test-blog.com',
    title: 'A test blog title',
    author: 'Yelko Carvajal',
    likes: 10
  }
  
  test('displays only title and author by default', () => {
    render(<Blog blog={defaultBlog} />)
  
    const element = screen.getByText(defaultBlog.title, { exact: false })
    expect(element).toBeDefined()
  
    const hideElement = screen.queryByText(defaultBlog.url)
    expect(hideElement).toBeNull()
  })
  
  test('clicking view button makes details visible', async () => {
    render(<Blog blog={defaultBlog}/>)
    
    let urlElement = screen.queryByText(defaultBlog.url)
    expect(urlElement).toBeNull()
    let likesElement = screen.queryByText(`likes: ${defaultBlog.likes}`)
    expect(likesElement).toBeNull()
    
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    urlElement = screen.queryByText(defaultBlog.url)
    expect(urlElement).not.toBeNull()
    likesElement = screen.queryByText(`likes: ${defaultBlog.likes}`)
    expect(likesElement).not.toBeNull()
  }) 

  test('click on likes button fires event', async () => {
    render(<Blog blog={defaultBlog}/>)

    vi.spyOn(BlogService, 'update').mockImplementation(() => null)
    const mockHandler = vi.fn()

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    
    await act(async () => {
      await viewButton.click()
    })

    const likeButton = screen.getByText('like')
    likeButton.onclick = mockHandler

    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


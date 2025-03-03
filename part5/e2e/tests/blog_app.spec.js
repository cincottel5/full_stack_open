const { test, expect, describe, beforeEach } = require('@playwright/test')
const { getDefaultUser, loginWith, getDefaultBlog, createBlog, logout, likeBlogNTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: getDefaultUser() })
    await request.post('/api/users', { data: getDefaultUser(2) })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const user = getDefaultUser()
      await loginWith(page, user.username, user.password)
      
      await expect(page.getByText(`${user.name} logged-in`)).toBeVisible()
    })

    test('fils with wrong credentials', async ({ page }) => {
      const user = getDefaultUser()
      await loginWith(page, user.username, 'wrongpassword')

      const errorDiv = await page.locator('.notification')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText(`${user.name} logged-in`)).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const user = getDefaultUser()
      await loginWith(page, user.username, user.password)
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = getDefaultBlog()

      await createBlog(page, blog)

      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText(`a new blog  ${blog.title} by ${blog.author} added`)
      await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, getDefaultBlog())
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = getDefaultBlog()
        
        const otherBlogText = await page.getByText(blog.title, { exact: false})
        const otherBlogElement = await otherBlogText.locator('..')

        await otherBlogElement.getByRole('button', { name: 'view'}).click()
        await otherBlogElement.getByRole('button', { name: 'like'}).click()

        expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('a blog can be delete by user creator', async ({ page }) => {
        const blog = getDefaultBlog()
        const otherBlogText = await page.getByText(blog.title, { exact: false})
        const otherBlogElement = await otherBlogText.locator('..')

        await otherBlogElement.getByRole('button', { name: 'view'}).click()
        page.on('dialog', dialog => dialog.accept())
        await otherBlogElement.getByRole('button', { name: 'remove'}).click()

        await expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
      })

      test('a blog cannot be delete by no-creator blog user', async ({ page }) => {
        const user = getDefaultUser(2)
        await logout()
        await loginWith(page, user.username, user.password)
        
        const blog = getDefaultBlog()
        const otherBlogText = await page.getByText(blog.title, { exact: false})
        const otherBlogElement = await otherBlogText.locator('..')
        
        await otherBlogElement.getByRole('button', { name: 'view'}).click()
        expect(otherBlogElement.getByRole('button', { name: 'remove'})).not.toBeVisible()
      })
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, getDefaultBlog(1))
        await createBlog(page, getDefaultBlog(2))
        await createBlog(page, getDefaultBlog(3))
      })

      test('blogs are arranged by likes', async ({ page }) => {
        const blog1 = getDefaultBlog(1)
        const blog2 = getDefaultBlog(2)
        const blog3 = getDefaultBlog(3)

        await likeBlogNTimes(page, blog1, 4)
        await likeBlogNTimes(page, blog2, 5)
        await likeBlogNTimes(page, blog2, 2)

        await logout()
        await loginWith(page, getDefaultUser().username, getDefaultUser().password)

        
      })
    })
  })


})
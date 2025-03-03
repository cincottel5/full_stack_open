const getDefaultUser = (num = 1) => ({
  name: `Yelko Carvajal ${num}`,
  username: `ycarvajal${num}`,
  password: 'gambitrocks'
})

const getDefaultBlog = (num = 1) => ({
  title: `Testing blog ${num}`,
  author: 'Tester',
  url: 'mytest.com'
})

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByText('login').click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', {name: 'new blog' }).click()
  await page.locator('#blog-input-title').fill(blog.title)
  await page.locator('#blog-input-author').fill(blog.author)
  await page.locator('#blog-input-url').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
}

const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const likeBlogNTimes = async (page, blog, times) => {
  const otherBlogText = await page.getByText(blog.title, { exact: true})
  const otherBlogElement = await otherBlogText.locator('..')

  for(let i = 0; i < times; i++) {
    if (i == 0)
      await otherBlogElement.getByRole('button', { name: 'view'}).click()

    await otherBlogElement.getByRole('button', { name: 'like'}).click()
    await otherBlogElement.getByText(`likes: ${i+1}`).waitFor()    
  }
}

export { 
  getDefaultUser, 
  loginWith,
  getDefaultBlog,
  createBlog,
  logout,
  likeBlogNTimes
}
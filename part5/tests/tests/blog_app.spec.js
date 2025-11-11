const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testUser',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'password')
      await expect(page.getByText('user testUser was succesfully logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'wrong')

      const errorDiv = page.locator('.errorMessage')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('user testUser was succesfully logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Test User", "A good title", "www.url.com")
      await expect(page.getByText('Test User A good title')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, "Test User", "A good title", "www.url.com")
      await expect(page.getByText('Test User A good title')).toBeVisible()
      const blogElement = page.locator('.blog')
      await blogElement
        .getByRole('button', { name: 'view' })
        .click()
      await blogElement.getByRole('button', { name: 'like'}).click()
      await expect(blogElement.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by creator', async ({ page }) => {
      await createBlog(page, "Test User", "A good title", "www.url.com")
      await expect(page.getByText('Test User A good title')).toBeVisible()

      const blogElement = page.locator('.blog')
      await blogElement
        .getByRole('button', { name: 'view' })
        .click()

      page.on('dialog', dialog => dialog.accept());
      await blogElement.getByRole('button', { name: 'delete'}).click()

      await expect(page.locator('.blog', { hasText: 'Test User A good title' })).toHaveCount(0)
    })

    test('a blog cannot be deleted by another user', async ({ page, request }) => {
      await createBlog(page, 'A blog title', 'Tester U', 'www.blog.com')
      await expect(page.getByText('A blog title Tester U')).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('/api/users', {
        data: { name: 'Tester', username: 'testUser2', password: 'password' }
      })

      await loginWith(page, 'testUser2', 'password')

      const blogElement = page.locator('.blog', { hasText: 'A blog title Tester U' })
      await blogElement.getByRole('button', { name: 'view' }).click()
      await expect(blogElement.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

    test('blogs are sorted by number of likes', async ({ page }) => {
      test.setTimeout(30000) // increasing time before test times out
      await createBlog(page, "Test User", "blog 1", "www.url.com")
      await page.getByRole('button', { name: 'cancel' }).click()
      await createBlog(page, "Test User", "blog 2", "www.url.com")
      await page.getByRole('button', { name: 'cancel' }).click()
      await createBlog(page, "Test User", "blog 3", "www.url.com")


      const pressLike = async (blogTitle, numberOfLikes) => {
        const blogElement = page.locator('.blog', { hasText: blogTitle })
        await blogElement.getByRole('button', { name: 'view' }).click()

        const likeButton = blogElement.getByRole('button', { name: 'like' })
        const likesLocator = blogElement.locator('text=/likes/')

        for (let i = 0; i < numberOfLikes; i++) {
          await likeButton.click()
          await expect(likesLocator).toContainText(`likes ${i + 1}`, { timeout: 5000 })
        }
      }


      await pressLike("blog 1", 2)
      await pressLike("blog 2", 7)
      await pressLike("blog 3", 5)

      const blogs = await page.locator('.blog').allTextContents()
      expect(blogs[0]).toContain('blog 2')
      expect(blogs[1]).toContain('blog 3')
      expect(blogs[2]).toContain('blog 1')
    })
  })
})
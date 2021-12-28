import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('user') 
  const [password, setPassword] = useState('password')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>     
  )

    const blogsRender = () => (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

    const handleTitleChange = (event) => {
      console.log(event.target.value)
      setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
      console.log(event.target.value)
      setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
      console.log(event.target.value)
      setUrl(event.target.value)
    }

    const addBlog = (event) => {
      event.preventDefault()
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
  
      blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))

          setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)    

          setTitle('')
          setAuthor('')
          setUrl('')
        })
    }

    const blogForm = () => (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          Title:
          <input
            value={newTitle}
            onChange={handleTitleChange}
          />
          <br></br>
          Author:
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
          <br></br>
          URL:
          <input
            value={newUrl}
            onChange={handleUrlChange}
          />
          <br></br>
          <button type="submit">create</button>
        </form> 
      </div> 
    )


    const loggedUser = () => (
      <div>
        {user.name} logged in 
        <button onClick={ () =>
           {
             window.localStorage.removeItem('loggedBlogappUser')
             window.location.reload(false)
            } }>
          logout
        </button>
      </div>
    )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          {loggedUser()}
          {blogForm()}
          {blogsRender()}
        </div>
      }
    </div>
  )
}

export default App
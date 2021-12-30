import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

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
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
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
}

export default BlogForm
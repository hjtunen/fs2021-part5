import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div> 
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          likes {blog.likes} 
          <button>like</button>
          <br></br>
          {blog.user.name}
        </div>
    </div>
  )}

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
  </div>
)}


export default Blog
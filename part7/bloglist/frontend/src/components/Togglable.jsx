import { useState } from 'react'
import { BlogForm, Button } from '../styled'

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm>
          {props.children}
          <Button onClick={toggleVisibility}>cancel</Button>
        </BlogForm>
      </div>
    </div>
  )
}

export default Togglable
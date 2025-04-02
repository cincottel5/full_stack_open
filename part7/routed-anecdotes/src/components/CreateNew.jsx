import { useNavigate } from 'react-router-dom'
import { useField } from "../hooks"
import PropTypes from "prop-types"

const propTypes = {
  addNew: PropTypes.func.isRequired
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...{value: content.value, onChange: content.onChange}} />
        </div>
        <div>
          author <input {...{value: author.value, onChange: author.onChange}} />
        </div>
        <div>
          url for more info <input {...{value: info.value, onChange: info.onChange}}/>
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

CreateNew.propTypes = propTypes

export default CreateNew
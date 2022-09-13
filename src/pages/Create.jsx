import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const initialState = {
  title: '',
  method: '',
  rating: ''
}

const Create = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [formError, setFormError] = useState(null)

  const { title, method, rating } = formData

  const onFormSubmit = async e => {
    e.preventDefault()

    //  handle errors
    if (!title|| !method|| !rating) {
      setFormError('Please complete all fields')
      return
    }

    //  add/create new shake into supabase
    const { data, error } = await supabase
      .from('shakes')
      .insert([{ title, method, rating }])

    if (error) {
      console.log(error)
      setFormError('Please complete all fields')
    }
    if (data) {
      console.log(data)

      //  clear errors
      clearFormError()

      //  reset/clear form input data
      setFormData(initialState)

      //  navigate back to home page
      navigate('/')
    }
  }

  const onInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const clearFormError = () => {
    setFormError(null)
  }

  const errClass = formError ? 'error' : 'offscreen'

  const content = (
    <main className="page create">
      <form onSubmit={onFormSubmit} className='shake-form'>
        <label htmlFor="title">Title:</label>
        <input type="text" id='title' name='title' value={title} onChange={onInputChange} />

        <label htmlFor="method">Method:</label>
        <textarea id='method' name='method' value={method} onChange={onInputChange} />

        <label htmlFor="rating">Rating:</label>
        <input type="number" id='rating' name='rating' value={rating} onChange={onInputChange} />

        <p className={errClass}>{formError}</p>

        <button className='btn'>Create Shake Recipe</button>
      </form>
    </main>
  )

  return content
}

export default Create
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'

const initialState = {
  title: '',
  method: '',
  rating: ''
}

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shake, setShake] = useState(initialState)
  const [formError, setFormError] = useState(null)
  const { title, method, rating } = shake

  useEffect(() => {
    const fetchShake = async () => {
      const { data, error } = await supabase
        .from('shakes')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setShake(prev => ({ ...prev, title: data.title, method: data.method, rating: data.rating }))
      }
    }

    fetchShake()
  }, [id, navigate])

  const onFormSubmit = async e => {
    e.preventDefault()

     //  handle errors
     if (!title || !method || !rating) {
      setFormError('Please complete all fields')
      return
    }

    const { data, error } = await supabase
    .from('shakes')
    .update({ title, method, rating })
    .eq('id', id)

    if (error) {
      console.log(error) 
      setFormError('Please complete all fields')
    }
    if (data) {
      console.log(data) 

      //  clear errors
      clearFormError()

      //  navigate back to home page
      navigate('/')
    }
  }

  const onInputChange = e => {
    const {name, value} = e.target
    setShake(prev => ({...prev, [name]: value}))
  }

  const clearFormError = () => {
    setFormError(null)
  }

  const errClass = formError ? 'error' : 'offscreen'

  return (
    <main className="page update">
      <form onSubmit={onFormSubmit} className='shake-form'>
        <label htmlFor="title">Title:</label>
        <input type="text" id='title' name='title' value={title} onChange={onInputChange} />

        <label htmlFor="method">Method:</label>
        <textarea id='method' name='method' value={method} onChange={onInputChange} />

        <label htmlFor="rating">Rating:</label>
        <input type="number" id='rating' name='rating' value={rating} onChange={onInputChange} />

        <p className={errClass}>{formError}</p>

        <button className='btn shake-form-btn'>Update Shake Recipe</button>
      </form>
    </main>
  )
}

export default Update
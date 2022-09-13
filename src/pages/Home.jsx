import supabase from '../config/supabaseClient'
import { useState, useEffect } from 'react'
//  components
import { ShakeCard } from '../components/ShakeCard/ShakeCard'

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [shakes, setShakes] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = id => {
    setShakes(prev => prev.filter(sh => sh.id !== id))
  }

  useEffect(() => {
    const fetchShakes = async () => {
      const { data, error } = await supabase
        .from('shakes')
        .select()
        .order(orderBy, { ascending: false })

      if (error) {
        setFetchError('Could not fetch shakes')
        setShakes(null)
        console.log(error)
      }
      if (data) {
        setShakes(data)
        setFetchError(null)
      }
    }

    fetchShakes()
  }, [orderBy])

  const content = (
    <main className='page home'>
      {fetchError && <p className='error'>{fetchError}</p>}
      <section className='shakes'>
        <div className="order-by">
          <p>Order by:</p>
          <button className='btn' onClick={() => setOrderBy('created_at')}>Time Created</button>
          <button className='btn' onClick={() => setOrderBy('title')}>Title</button>
          <button className='btn' onClick={() => setOrderBy('rating')}>Rating</button>
          {orderBy}
        </div>
        <div className="shakes-grid">
          {shakes?.map(shake => (
            <ShakeCard key={shake.id} shake={shake} handleDelete={handleDelete} />
          ))}
        </div>
      </section>
    </main>
  )

  return content
}

export default Home

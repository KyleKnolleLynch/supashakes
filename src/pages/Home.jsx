import supabase from '../config/supabaseClient'
import { useState, useEffect } from 'react'
//  components
import { ShakeCard } from '../components/ShakeCard/ShakeCard'

const Home = () => {
  console.log(supabase)

  const [fetchError, setFetchError] = useState(null)
  const [shakes, setShakes] = useState(null)

  useEffect(() => {
    const fetchShakes = async () => {
      const { data, error } = await supabase.from('shakes').select()

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
  }, [])

  const content = (
    <main className='page home'>
      {fetchError && <p className='error'>{fetchError}</p>}
      <section className='shakes'>
        {/* order by buttons */}
        <div className="shakes-grid">
          {shakes?.map(shake => (
            <ShakeCard key={shake.id} shake={shake} />
          ))}
        </div>
      </section>
    </main>
  )

  return content
}

export default Home

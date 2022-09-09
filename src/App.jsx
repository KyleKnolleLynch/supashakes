import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Supa Shakes</h1>
        <nav aria-label='Main'>
          <Link to='/'>Home</Link>
          <Link to='/create'>Create New Shake</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

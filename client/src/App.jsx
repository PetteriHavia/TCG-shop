import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'

function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route exec path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App

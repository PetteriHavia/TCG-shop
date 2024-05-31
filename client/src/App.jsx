import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import ProductPage from './pages/ProductPage'

function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route exec path="/" element={<Home />} />
        <Route path="/products/:identifier" element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App

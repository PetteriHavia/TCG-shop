import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import ProductPage from './pages/ProductPage'
import AllProducts from './pages/AllProducts'


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exec path="/" element={<Home />} />
        <Route path="/products/:identifier" element={<ProductPage />} />
        <Route path="search/products/:category" element={<AllProducts />} />
      </Routes>
    </>
  )
}

export default App

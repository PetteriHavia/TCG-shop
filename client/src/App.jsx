import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import ProductPage from './pages/ProductPage'
import AllProducts from './pages/AllProducts'
import PageNotFound from './components/PageNotFound'
import CartPage from './pages/CartPage'


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exec path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<AllProducts />} />
        <Route path="/products/Single-card/:setName" element={<AllProducts />} />
        <Route path="/products/:category/:identifier" element={<ProductPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Technology from './pages/Technology'
import Philosophy from './pages/Philosophy'
import About from './pages/About'
import Research from './pages/Research'
import News from './pages/News'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;

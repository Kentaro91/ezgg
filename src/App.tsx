import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import D2RWarlockGuide from './games/d2r/components/WarlockGuide'
import D2RRunewordCalc from './games/d2r/components/RunewordCalc'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/d2r/warlock" element={<D2RWarlockGuide />} />
        <Route path="/d2r/runewords" element={<D2RRunewordCalc />} />
      </Route>
    </Routes>
  )
}

export default App

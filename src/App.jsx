
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Timeline from './pages/Timeline'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        {/* <Route path="/memories" element={<Memories />} /> */}
        {/* <Route path="/scratch" element={<Scratch />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

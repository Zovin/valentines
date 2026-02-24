
import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Memories from './pages/Memories'
import Scratch from './pages/Scratch'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/scratch" element={<Scratch />} />
      </Routes>
    </HashRouter>
  )
}

export default App

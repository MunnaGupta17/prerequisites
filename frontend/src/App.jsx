import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DestinationPage from './pages/DestinationPage'
import SubmitTipPage from './pages/SubmitTipPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                        element={<HomePage />} />
        <Route path="/destination/:slug"       element={<DestinationPage />} />
        <Route path="/submit"                  element={<SubmitTipPage />} />
      </Routes>
    </BrowserRouter>
  )
}

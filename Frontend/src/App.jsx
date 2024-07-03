import { Routes, Route, Link, BrowserRouter as Router, RouterProvider } from 'react-router-dom'
import './App.css'
import { LoginPage } from './Pages/LoginPage'
import { SignupPage } from './Pages/SignupPage'
import { HomePage } from './Pages/HomePage'
import { BreweryDetails } from './Pages/BreweryDetails'
import { ProtectedRoute } from './utils/ProtectedRoute'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={<HomePage /> } />
          <Route path='/details' element={<BreweryDetails/>} />
          <Route path='/testing' element={<p>Testing page</p>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

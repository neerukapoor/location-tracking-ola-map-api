import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { useAuthContext } from './context/AuthContext'
import RegisterNewEmployee from './components/RegisterNewEmployee'
import GeoLocation from './pages/home/GeoLocation'

function App() {
  const {authUser} = useAuthContext();
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        <Routes>
          <Route path="/"  element={authUser ? <Home/> : <Navigate to="/login"/>}/>
          <Route path="/login"  element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup"  element={authUser ? <Navigate to="/"/> : <Signup/>}/>
          <Route path="/register" element={authUser ? <RegisterNewEmployee /> : <Navigate to= "/login"/>} />
          <Route path="/map" element={authUser ? <GeoLocation /> : <Navigate to= "/login"/>} />
        </Routes>
      </div>
    </>
  )
}

export default App

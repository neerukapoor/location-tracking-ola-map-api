import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { useAuthContext } from './context/AuthContext'
import RegisterNewEmployee from './components/RegisterNewEmployee'
import GeoLocation from './pages/home/GeoLocation'
import EmployeeLocationTracker from './components/EmployeeLocationTracker'
import { useEmployeeAuthContext } from './context/EmployeeAuthContext'
import EmployeeLogin from './pages/login/EmployeeLogin'
import { useEmployeeDetailsContext } from './context/EmployeeDetailsContext'

function App() {
  const {authUser} = useAuthContext();
  const {employeeAuthUser} = useEmployeeAuthContext();
  const {employeeDetails} = useEmployeeDetailsContext();
  console.log("neeru in app.tsx " + employeeDetails?.id);
  return (
    <>
      <div className='flex justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        <Routes>
          <Route path="/"  element={authUser ? <Home/> : <Navigate to="/login"/>}/>
          <Route path="/login"  element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup"  element={authUser ? <Navigate to="/"/> : <Signup/>}/>
          <Route path="/register" element={authUser ? <RegisterNewEmployee /> : <Navigate to= "/login"/>} />
          <Route path="/map" element={authUser ? <GeoLocation /> : <Navigate to= "/login"/>} />
          <Route path="/employee/login" element={employeeAuthUser ? <Navigate to="/employee"/> : <EmployeeLogin/>}/>
          <Route path="/employee" element={employeeAuthUser ? <EmployeeLocationTracker employeeId={employeeDetails?.id || ''} /> : <Navigate to= "/employee/login"/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useEmployeeAuthContext } from './context/EmployeeAuthContext'
import EmployeeLogin from './pages/login/EmployeeLogin';
import EmployeeLocationTracker from './components/EmployeeLocationTracker';
import Tracking from './pages/home/Tracking';

function App() {
  const {employeeAuthUser} = useEmployeeAuthContext();

  return (
    <>
    <div className='flex justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        <Routes>
          {/* for employee */}
          <Route path="/login" element={employeeAuthUser ? <Navigate to="/"/> : <EmployeeLogin/>}/>
          <Route path="/employeeMap" element={employeeAuthUser ? <EmployeeLocationTracker/> : <Navigate to= "/login"/>}/>
          <Route path="/" element={employeeAuthUser ? <Tracking/> : <Navigate to= "/login"/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { RegisteredEmployeesProvider } from './context/RegisteredEmployeesContext.tsx';
import { EmployeeAuthContextProvider } from './context/EmployeeAuthContext.tsx';
import { EmployeeDetailsContextProvider } from './context/EmployeeDetailsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EmployeeDetailsContextProvider>
        <EmployeeAuthContextProvider>
          <RegisteredEmployeesProvider>
              <AuthContextProvider>
                <App />
              </AuthContextProvider>
          </RegisteredEmployeesProvider>
        </EmployeeAuthContextProvider>
      </EmployeeDetailsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

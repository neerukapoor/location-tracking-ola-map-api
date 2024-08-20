import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { RegisteredEmployeesProvider } from './context/RegisteredEmployeesContext.tsx';
import { EmployeeAuthContextProvider } from './context/EmployeeAuthContext.tsx';
import { EmployeeDetailsContextProvider } from './context/EmployeeDetailsContext.tsx';
import { EmployeeDetailsForEmployeeContextProvider } from './context/EmployeeDetailsForEmployee.tsx';
import { DateProvider } from './context/DateContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DateProvider>
        <EmployeeDetailsForEmployeeContextProvider>
          <EmployeeDetailsContextProvider>
            <EmployeeAuthContextProvider>
              <RegisteredEmployeesProvider>
                  <AuthContextProvider>
                    <App />
                  </AuthContextProvider>
              </RegisteredEmployeesProvider>
            </EmployeeAuthContextProvider>
          </EmployeeDetailsContextProvider>
        </EmployeeDetailsForEmployeeContextProvider>
      </DateProvider>
    </BrowserRouter>
  </StrictMode>,
)

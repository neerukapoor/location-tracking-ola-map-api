import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx'
import { RegisteredEmployeesProvider } from './context/RegisteredEmployeesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RegisteredEmployeesProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </RegisteredEmployeesProvider>
    </BrowserRouter>
  </StrictMode>,
)

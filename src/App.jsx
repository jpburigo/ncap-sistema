import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import NonConformities from './pages/NonConformities'
import ActionPlans from './pages/ActionPlans'
import Reports from './pages/Reports'
import Login from './pages/Login'
import { useAuthStore } from './store/authStore'

export default function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nao-conformidades" element={<NonConformities />} />
            <Route path="/plano-acao" element={<ActionPlans />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  )
}

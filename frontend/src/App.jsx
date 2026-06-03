import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import FounderDashboard from './pages/founder/FounderDashboard';
import CreateStartupPage from './pages/founder/CreateStartupPage';
import InvestorDashboard from './pages/investor/InvestorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PitchUpdatePage from './pages/founder/PitchUpdatePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/founder"
        element={
          <ProtectedRoute allowedRoles={['founder']}>
            <FounderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/founder/create-startup"
        element={
          <ProtectedRoute allowedRoles={['founder']}>
            <CreateStartupPage />
          </ProtectedRoute>
        }
      />
      
      <Route
       path="/founder/startups/:id/pitch"
       element={
        <ProtectedRoute allowedRoles={['founder']}>
          <PitchUpdatePage />
        </ProtectedRoute>
  }
/>
      <Route
        path="/investor"
        element={
          <ProtectedRoute allowedRoles={['investor']}>
            <InvestorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import EventDetail from './pages/EventDetail'
import EditEvent from './pages/EditEvent'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import MyInvitations from './pages/MyInvitations'
import Organizadores from './pages/Organizadores'
import OrganizadorDetail from './pages/OrganizadorDetail'
import BecomeOrganizer from './pages/BecomeOrganizer'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="/invitations" element={<MyInvitations />} />
            <Route path="/organizadores" element={<Organizadores />} />
            <Route path="/organizadores/:id" element={<OrganizadorDetail />} />
            <Route path="/become-organizer" element={<BecomeOrganizer />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
} )
}

export default App

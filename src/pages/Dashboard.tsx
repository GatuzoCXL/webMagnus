import { useAuth } from '../context/AuthContext'
import { useEvents } from '../hooks/useEvents'
import { getEventStatus } from '../utils/eventStatus'
import { EventStatus } from '../types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const { data: events, isLoading } = useEvents(user?.id || '')

  const stats = {
    total: events?.length || 0,
    upcoming: events?.filter(e => getEventStatus(e) === EventStatus.UPCOMING).length || 0,
    inProgress: events?.filter(e => getEventStatus(e) === EventStatus.IN_PROGRESS).length || 0,
    completed: events?.filter(e => getEventStatus(e) === EventStatus.COMPLETED).length || 0,
  }

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {user?.nombre}!
        </h1>
        <p className="text-gray-600">Aquí está el resumen de tus eventos</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card bg-gradient-to-br from-primary to-primary-dark text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Eventos</p>
                  <p className="text-4xl font-bold mt-2">{stats.total}</p>
                </div>
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-gradient-to-br from-info to-blue-600 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Próximos</p>
                  <p className="text-4xl font-bold mt-2">{stats.upcoming}</p>
                </div>
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-gradient-to-br from-warning to-yellow-600 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">En Curso</p>
                  <p className="text-4xl font-bold mt-2">{stats.inProgress}</p>
                </div>
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card bg-gradient-to-br from-success to-green-600 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Completados</p>
                  <p className="text-4xl font-bold mt-2">{stats.completed}</p>
                </div>
                <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Acciones Rápidas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                to="/events/create"
                className="btn btn-primary flex items-center justify-center py-4 text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Nuevo Evento
              </Link>
              <Link
                to="/events"
                className="btn btn-outline flex items-center justify-center py-4 text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ver Mis Eventos
              </Link>
              <Link
                to="/invitations"
                className="btn btn-secondary flex items-center justify-center py-4 text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Mis Invitaciones
              </Link>
              <Link
                to="/organizadores"
                className="btn btn-outline flex items-center justify-center py-4 text-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Organizadores
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

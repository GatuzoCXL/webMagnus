import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEvents, useDeleteEvent } from '../hooks/useEvents'
import EventCard from '../components/EventCard'
import { motion, AnimatePresence } from 'framer-motion'

export default function Events() {
  const { user } = useAuth()
  const { data: events, isLoading } = useEvents(user?.id || '')
  const deleteEvent = useDeleteEvent()
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent.mutateAsync(id)
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error al eliminar evento:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Mis Eventos</h1>
        <Link to="/events/create" className="btn btn-primary">
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Evento
        </Link>
      </motion.div>

      {!events || events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12"
        >
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes eventos</h3>
          <p className="text-gray-500 mb-6">Comienza creando tu primer evento</p>
          <Link to="/events/create" className="btn btn-primary inline-block">
            Crear Primer Evento
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ¿Eliminar evento?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. El evento será eliminado permanentemente.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn btn-outline"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteEvent.isPending}
                className="flex-1 btn bg-error text-white hover:bg-red-600"
              >
                {deleteEvent.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

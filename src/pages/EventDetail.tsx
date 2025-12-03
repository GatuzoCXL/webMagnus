import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEvent, useDeleteEvent } from '../hooks/useEvents'
import { getEventStatus, getStatusText, getStatusColor, canDeleteEvent, canEditEvent } from '../utils/eventStatus'
import { formatEventDateRange, formatDate } from '../utils/formatDate'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: event, isLoading } = useEvent(id!)
  const deleteEvent = useDeleteEvent()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    if (!event) return
    try {
      await deleteEvent.mutateAsync(event.id)
      navigate('/events')
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

  if (!event) {
    return (
      <div className="px-4 py-6">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h2>
          <Link to="/events" className="btn btn-primary inline-block">
            Volver a Mis Eventos
          </Link>
        </div>
      </div>
    )
  }

  const status = getEventStatus(event)
  const statusText = getStatusText(status)
  const statusColor = getStatusColor(status)

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link to="/events" className="text-primary hover:underline flex items-center mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Mis Eventos
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{event.titulo}</h1>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}>
              {statusText}
            </span>
          </div>
          <div className="flex gap-2">
            {canEditEvent(event) && (
              <Link
                to={`/events/${event.id}/edit`}
                className="btn btn-outline"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </Link>
            )}
            {canDeleteEvent(event) && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn bg-error text-white hover:bg-red-600"
              >
                <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Descripción</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{event.descripcion}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fecha y Hora</p>
                  <p className="text-gray-900 font-medium">{formatEventDateRange(event.fechaInicio, event.fechaFin)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="text-gray-900 font-medium">{event.lugar}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Capacidad</p>
                  <p className="text-gray-900 font-medium">{event.capacidad} personas</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Información Adicional</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Estado del Evento</p>
                  <p className="text-gray-900">{statusText}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Inicio</p>
                  <p className="text-gray-900">{formatDate(event.fechaInicio, 'PPP p')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Finalización</p>
                  <p className="text-gray-900">{formatDate(event.fechaFin, 'PPP p')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
              Esta acción no se puede deshacer. El evento "{event.titulo}" será eliminado permanentemente.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn btn-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
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

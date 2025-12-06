import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEvent, useUpdateEvent } from '../hooks/useEvents'
import { validateEventTitle, validateEventCapacity, validateEventDates } from '../utils/validators'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

export default function EditEvent() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: event, isLoading } = useEvent(String(id))
  const updateEvent = useUpdateEvent()

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    lugar: '',
    capacidad: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.fechaInicio)
      const endDate = new Date(event.fechaFin)
      
      setFormData({
        titulo: event.titulo,
        descripcion: event.descripcion,
        lugar: event.lugar,
        capacidad: event.capacidad.toString(),
        startDate: format(startDate, 'yyyy-MM-dd'),
        startTime: format(startDate, 'HH:mm'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        endTime: format(endDate, 'HH:mm'),
      })
    }
  }, [event])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEventTitle(formData.titulo)) {
      setError('El título debe tener al menos 3 caracteres')
      return
    }

    const capacity = parseInt(formData.capacidad)
    if (!validateEventCapacity(capacity)) {
      setError('La capacidad debe ser entre 1 y 10000')
      return
    }

    if (!formData.startDate || !formData.endDate) {
      setError('Selecciona las fechas del evento')
      return
    }

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`).getTime()
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`).getTime()

    const dateValidation = validateEventDates(startDateTime, endDateTime)
    if (!dateValidation.valid) {
      setError(dateValidation.message || 'Error en las fechas')
      return
    }

    try {
      await updateEvent.mutateAsync({
        id: id!,
        event: {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          fechaInicio: new Date(startDateTime).toISOString(),
          fechaFin: new Date(endDateTime).toISOString(),
          lugar: formData.lugar,
          capacidad: capacity,
          organizadorId: user?.id || '',
        }
      })

      navigate(`/events/${id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar el evento')
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Evento no encontrado</h2>
          <Link to="/events" className="btn btn-primary inline-block">
            Volver a Mis Eventos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to={`/events/${id}`} className="text-primary hover:underline flex items-center mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Evento
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Editar Evento</h1>
        <p className="text-gray-600 dark:text-gray-400">Actualiza los detalles del evento</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título del Evento *
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="input min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Inicio *
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hora de Inicio *
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Fin *
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hora de Fin *
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lugar *
            </label>
            <input
              id="lugar"
              name="lugar"
              type="text"
              value={formData.lugar}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capacidad de Personas *
            </label>
            <input
              id="capacidad"
              name="capacidad"
              type="number"
              value={formData.capacidad}
              onChange={handleChange}
              className="input"
              min="1"
              max="10000"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(`/events/${id}`)}
              className="flex-1 btn btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={updateEvent.isPending}
              className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateEvent.isPending ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

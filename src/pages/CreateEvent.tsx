import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCreateEvent } from '../hooks/useEvents'
import { validateEventTitle, validateEventCapacity, validateEventDates } from '../utils/validators'
import { motion } from 'framer-motion'

export default function CreateEvent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const createEvent = useCreateEvent()

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    lugar: '',
    capacidad: '',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '18:00',
  })
  const [error, setError] = useState('')

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
      await createEvent.mutateAsync({
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fechaInicio: startDateTime,
        fechaFin: endDateTime,
        lugar: formData.lugar,
        capacidad: capacity,
        organizadorId: user?.id || '',
      })

      navigate('/events')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el evento')
    }
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Evento</h1>
        <p className="text-gray-600">Completa los detalles del evento</p>
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
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título del Evento *
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              className="input"
              placeholder="Ej: Boda de María y Juan"
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="input min-h-[100px]"
              placeholder="Describe tu evento..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
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
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
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
            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700 mb-2">
              Lugar *
            </label>
            <input
              id="lugar"
              name="lugar"
              type="text"
              value={formData.lugar}
              onChange={handleChange}
              className="input"
              placeholder="Ej: Salón de Eventos Los Jardines"
              required
            />
          </div>

          <div>
            <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad de Personas *
            </label>
            <input
              id="capacidad"
              name="capacidad"
              type="number"
              value={formData.capacidad}
              onChange={handleChange}
              className="input"
              placeholder="Ej: 150"
              min="1"
              max="10000"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="flex-1 btn btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createEvent.isPending}
              className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createEvent.isPending ? 'Creando...' : 'Crear Evento'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

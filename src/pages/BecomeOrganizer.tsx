import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCreateOrganizador } from '../hooks/useOrganizadores'
import { useAuth } from '../context/AuthContext'

export default function BecomeOrganizer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate: createOrganizador, isPending } = useCreateOrganizador()

  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    descripcion: '',
    telefono: '',
    direccion: '',
    precioPorEvento: '',
    añosExperiencia: '',
    especialidad: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Debes iniciar sesión para convertirte en organizador')
      navigate('/login')
      return
    }

    createOrganizador(
      {
        nombreEmpresa: formData.nombreEmpresa,
        descripcion: formData.descripcion || undefined,
        telefono: formData.telefono,
        direccion: formData.direccion || undefined,
        precioPorEvento: parseFloat(formData.precioPorEvento),
        añosExperiencia: parseInt(formData.añosExperiencia),
        especialidad: formData.especialidad || undefined,
        usuarioId: user.id,
      },
      {
        onSuccess: (data) => {
          alert('¡Perfil de organizador creado exitosamente!')
          navigate(`/organizadores/${data.id}`)
        },
        onError: (error: any) => {
          alert(error.response?.data?.message || 'Error al crear el perfil de organizador')
        },
      }
    )
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conviértete en Organizador</h1>
        <p className="text-gray-600">Completa tu perfil profesional para ofrecer tus servicios</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombreEmpresa" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Bodas Mágicas"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono de Contacto *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+52 123 456 7890"
            />
          </div>

          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ciudad, Estado"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="precioPorEvento" className="block text-sm font-medium text-gray-700 mb-2">
                Precio por Evento * ($)
              </label>
              <input
                type="number"
                id="precioPorEvento"
                name="precioPorEvento"
                value={formData.precioPorEvento}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="5000"
              />
            </div>

            <div>
              <label htmlFor="añosExperiencia" className="block text-sm font-medium text-gray-700 mb-2">
                Años de Experiencia *
              </label>
              <input
                type="number"
                id="añosExperiencia"
                name="añosExperiencia"
                value={formData.añosExperiencia}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700 mb-2">
              Especialidad
            </label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Bodas elegantes, eventos al aire libre, etc."
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Servicio
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Cuéntanos sobre tus servicios, experiencia, y qué te hace único..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary flex-1"
            >
              {isPending ? 'Creando perfil...' : 'Crear Perfil de Organizador'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/organizadores')}
              disabled={isPending}
              className="btn btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

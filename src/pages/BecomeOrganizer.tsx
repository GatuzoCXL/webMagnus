import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCreateOrganizador, useOrganizadorByUsuarioId } from '../hooks/useOrganizadores'
import { useAuth } from '../context/AuthContext'

export default function BecomeOrganizer() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate: createOrganizador, isPending } = useCreateOrganizador()
  const { data: existingOrganizador, isLoading: isCheckingOrganizador } = useOrganizadorByUsuarioId(user?.id)

  useEffect(() => {
    if (existingOrganizador) {
      alert('Ya estás registrado como organizador')
      navigate(`/organizadores/${existingOrganizador.id}`)
    }
  }, [existingOrganizador, navigate])

  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    descripcion: '',
    telefono: '',
    direccion: '',
    precioPorEvento: '',
    añosExperiencia: '',
    especialidad: '',
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Validar nombre de empresa
    if (formData.nombreEmpresa.length < 3) {
      errors.nombreEmpresa = 'El nombre debe tener al menos 3 caracteres'
    }

    // Validar teléfono (formato básico)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    if (!phoneRegex.test(formData.telefono)) {
      errors.telefono = 'Teléfono inválido (mínimo 10 dígitos)'
    }

    // Validar dirección
    if (formData.direccion.trim().length < 5) {
      errors.direccion = 'La dirección debe tener al menos 5 caracteres'
    }

    // Validar precio
    const precio = parseFloat(formData.precioPorEvento)
    if (isNaN(precio) || precio < 1000 || precio > 500000) {
      errors.precioPorEvento = 'El precio debe estar entre $1,000 y $500,000'
    }

    // Validar años de experiencia
    const experiencia = parseInt(formData.añosExperiencia)
    if (isNaN(experiencia) || experiencia < 1 || experiencia > 50) {
      errors.añosExperiencia = 'Los años de experiencia deben estar entre 1 y 50'
    }

    // Validar especialidad
    if (formData.especialidad.trim().length < 5) {
      errors.especialidad = 'La especialidad debe tener al menos 5 caracteres'
    }

    // Validar descripción
    if (formData.descripcion.trim().length < 50) {
      errors.descripcion = 'La descripción debe tener al menos 50 caracteres para describir tus servicios'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Debes iniciar sesión para convertirte en organizador')
      navigate('/login')
      return
    }

    if (!validateForm()) {
      return
    }

    createOrganizador(
      {
        nombreEmpresa: formData.nombreEmpresa.trim(),
        descripcion: formData.descripcion.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        precioPorEvento: parseFloat(formData.precioPorEvento),
        añosExperiencia: parseInt(formData.añosExperiencia),
        especialidad: formData.especialidad.trim(),
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

  if (isCheckingOrganizador) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando tu estado...</p>
        </div>
      </div>
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                validationErrors.nombreEmpresa ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Bodas Mágicas"
            />
            {validationErrors.nombreEmpresa && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.nombreEmpresa}</p>
            )}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                validationErrors.telefono ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+52 123 456 7890"
            />
            {validationErrors.telefono && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.telefono}</p>
            )}
          </div>

            <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección *
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                validationErrors.direccion ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ciudad, Estado (Ej: Guadalajara, Jalisco)"
            />
            {validationErrors.direccion && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.direccion}</p>
            )}
          </div>          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="precioPorEvento" className="block text-sm font-medium text-gray-700 mb-2">
                Precio por Evento * ($1,000 - $500,000)
              </label>
              <input
                type="number"
                id="precioPorEvento"
                name="precioPorEvento"
                value={formData.precioPorEvento}
                onChange={handleChange}
                required
                min="1000"
                max="500000"
                step="100"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  validationErrors.precioPorEvento ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="15000"
              />
              {validationErrors.precioPorEvento && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.precioPorEvento}</p>
              )}
            </div>

            <div>
              <label htmlFor="añosExperiencia" className="block text-sm font-medium text-gray-700 mb-2">
                Años de Experiencia * (1-50)
              </label>
              <input
                type="number"
                id="añosExperiencia"
                name="añosExperiencia"
                value={formData.añosExperiencia}
                onChange={handleChange}
                required
                min="1"
                max="50"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  validationErrors.añosExperiencia ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="5"
              />
              {validationErrors.añosExperiencia && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.añosExperiencia}</p>
              )}
            </div>
          </div>

<div>
  <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700 mb-2">
    Especialidad *
  </label>
  <input
    type="text"
    id="especialidad"
    name="especialidad"
    value={formData.especialidad}
    onChange={handleChange}
    required
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
      validationErrors.especialidad ? 'border-red-500' : 'border-gray-300'
    }`}
    placeholder="Bodas elegantes, eventos corporativos, XV años..."
  />
</div>

<div className="mt-6">
  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
    Descripción del Servicio * (mínimo 50 caracteres)
  </label>
  <textarea
    id="descripcion"
    name="descripcion"
    value={formData.descripcion}
    onChange={handleChange}
    rows={4}
    required
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
      validationErrors.descripcion ? 'border-red-500' : 'border-gray-300'
    }`}
    placeholder="Describe tus servicios, experiencia, logros, certificaciones, y qué te hace único como organizador profesional de eventos..."
  />
  
  <div className="flex justify-between items-center mt-1">
    <p className="text-gray-500 text-sm">
      {formData.descripcion.length} / 50 caracteres mínimo
    </p>
    {validationErrors.descripcion && (
      <p className="text-red-500 text-sm">{validationErrors.descripcion}</p>
    )}
  </div>
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

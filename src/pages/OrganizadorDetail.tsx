import { useParams, Link, useNavigate } from 'react-router-dom'
import { useOrganizador } from '../hooks/useOrganizadores'
import { motion } from 'framer-motion'

export default function OrganizadorDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: organizador, isLoading } = useOrganizador(id!)

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!organizador) {
    return (
      <div className="px-4 py-6">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Organizador no encontrado</h2>
          <button onClick={() => navigate('/organizadores')} className="btn btn-primary inline-block">
            Volver a Organizadores
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link to="/organizadores" className="text-primary hover:underline flex items-center mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Organizadores
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{organizador.nombreEmpresa}</h1>
            {organizador.especialidad && (
              <p className="text-lg text-gray-600 dark:text-gray-400">{organizador.especialidad}</p>
            )}
          </div>
          {organizador.verificado && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verificado
            </span>
          )}
        </div>

        <div className="flex items-center mb-6">
          <div className="flex items-center mr-6">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{organizador.rating.toFixed(1)}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {organizador.añosExperiencia} {organizador.añosExperiencia === 1 ? 'año' : 'años'} de experiencia
          </div>
        </div>

        {organizador.descripcion && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Sobre nosotros</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{organizador.descripcion}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-900 dark:text-gray-100">{organizador.telefono}</span>
              </div>
              {organizador.direccion && (
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-900 dark:text-gray-100">{organizador.direccion}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary-light p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Precio por Evento</h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary">${organizador.precioPorEvento.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Precio base por evento</p>
            <button className="w-full btn btn-primary mt-4">
              Solicitar Cotización
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

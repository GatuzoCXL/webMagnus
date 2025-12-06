import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { formatDate } from '../utils/formatDate'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mi Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400">Información de tu cuenta</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
            {user.nombre.charAt(0).toUpperCase()}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.nombre}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nombre Completo</p>
            <p className="text-gray-900 dark:text-gray-100 font-medium">{user.nombre}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Correo Electrónico</p>
            <p className="text-gray-900 dark:text-gray-100 font-medium">{user.email}</p>
          </div>

          {user.createdAt && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Miembro desde</p>
              <p className="text-gray-900 dark:text-gray-100 font-medium">{formatDate(new Date(user.createdAt).getTime(), 'PPP')}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ID de Usuario</p>
            <p className="text-gray-900 dark:text-gray-100 font-mono text-sm">{user.id}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acciones de Cuenta</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-outline text-left">
              <svg className="w-5 h-5 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Cambiar Contraseña
            </button>
            <button className="w-full btn btn-outline text-left">
              <svg className="w-5 h-5 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Perfil
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

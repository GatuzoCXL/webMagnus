import { motion } from 'framer-motion'
import { useMyInvitations, useAcceptInvitation, useRejectInvitation } from '../hooks/useInvitations'
import { getInvitationStatusText, getInvitationStatusColor } from '../utils/invitationStatus'
import { formatDate } from '../utils/formatDate'
import { EstadoInvitacion } from '../types'
import { useState } from 'react'

export default function MyInvitations() {
  const { data: invitations = [], isLoading } = useMyInvitations()
  const acceptInvitation = useAcceptInvitation()
  const rejectInvitation = useRejectInvitation()
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  const handleAccept = async (id: string) => {
    setActionInProgress(id)
    try {
      await acceptInvitation.mutateAsync(id)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleReject = async (id: string) => {
    setActionInProgress(id)
    try {
      await rejectInvitation.mutateAsync(id)
    } finally {
      setActionInProgress(null)
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
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Invitaciones</h1>
        <p className="text-gray-600">Eventos a los que has sido invitado o te has postulado</p>
      </motion.div>

      {invitations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center py-12"
        >
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No tienes invitaciones</h2>
          <p className="text-gray-500">Cuando te inviten a un evento, aparecerá aquí</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation, index) => (
            <motion.div
              key={invitation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {invitation.evento?.titulo || 'Evento'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {invitation.evento?.descripcion || ''}
                      </p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getInvitationStatusColor(invitation.estado)}`}>
                      {getInvitationStatusText(invitation.estado)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {invitation.evento?.fechaInicio && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(invitation.evento.fechaInicio, 'PPP')}
                      </div>
                    )}
                    {invitation.evento?.lugar && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {invitation.evento.lugar}
                      </div>
                    )}
                  </div>

                  {invitation.esAutopostulacion && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        Auto-postulación
                      </span>
                    </div>
                  )}

                  {invitation.mensaje && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Mensaje:</span> {invitation.mensaje}
                      </p>
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    Invitación recibida: {formatDate(new Date(invitation.fechaInvitacion).getTime(), 'PPP p')}
                  </div>
                </div>

                {invitation.estado === EstadoInvitacion.PendienteRespuesta && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(invitation.id)}
                      disabled={actionInProgress === invitation.id}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {actionInProgress === invitation.id ? 'Procesando...' : 'Aceptar'}
                    </button>
                    <button
                      onClick={() => handleReject(invitation.id)}
                      disabled={actionInProgress === invitation.id}
                      className="btn btn-outline disabled:opacity-50"
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {invitation.estado === EstadoInvitacion.PendienteAprobacion && (
                  <div className="text-sm text-gray-600 italic">
                    Esperando aprobación del organizador
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

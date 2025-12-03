import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEventInvitations, useApproveInvitation, useRejectInvitationByOrganizer } from '../hooks/useInvitations'
import { getInvitationStatusText, getInvitationStatusColor } from '../utils/invitationStatus'
import { formatDate } from '../utils/formatDate'
import { EstadoInvitacion } from '../types'

interface EventInvitationsProps {
  eventoId: string
}

export default function EventInvitations({ eventoId }: EventInvitationsProps) {
  const { data: invitations = [], isLoading } = useEventInvitations(eventoId)
  const approveInvitation = useApproveInvitation()
  const rejectInvitation = useRejectInvitationByOrganizer()
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    setActionInProgress(id)
    try {
      await approveInvitation.mutateAsync(id)
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
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const pendingApprovals = invitations.filter(inv => inv.estado === EstadoInvitacion.PendienteAprobacion)
  const confirmed = invitations.filter(inv => inv.estado === EstadoInvitacion.Confirmado)
  const others = invitations.filter(inv => 
    inv.estado !== EstadoInvitacion.PendienteAprobacion && 
    inv.estado !== EstadoInvitacion.Confirmado
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Invitados</h2>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
            {confirmed.length} confirmados
          </span>
          {pendingApprovals.length > 0 && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
              {pendingApprovals.length} pendientes
            </span>
          )}
        </div>
      </div>

      {invitations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay invitados aún
        </div>
      ) : (
        <>
          {pendingApprovals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Solicitudes Pendientes</h3>
              <div className="space-y-2">
                {pendingApprovals.map((invitation) => (
                  <motion.div
                    key={invitation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {invitation.usuario?.nombre || 'Usuario'}
                          </p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getInvitationStatusColor(invitation.estado)}`}>
                            {getInvitationStatusText(invitation.estado)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{invitation.usuario?.email}</p>
                        {invitation.mensaje && (
                          <p className="text-sm text-gray-700 mt-2 italic">"{invitation.mensaje}"</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Solicitó: {formatDate(new Date(invitation.fechaInvitacion).getTime(), 'PPP p')}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApprove(invitation.id)}
                          disabled={actionInProgress === invitation.id}
                          className="btn btn-primary btn-sm disabled:opacity-50"
                        >
                          {actionInProgress === invitation.id ? '...' : 'Aprobar'}
                        </button>
                        <button
                          onClick={() => handleReject(invitation.id)}
                          disabled={actionInProgress === invitation.id}
                          className="btn btn-outline btn-sm disabled:opacity-50"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {confirmed.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirmados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {confirmed.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{invitation.usuario?.nombre || 'Usuario'}</p>
                        <p className="text-sm text-gray-600">{invitation.usuario?.email}</p>
                        {invitation.fechaRespuesta && (
                          <p className="text-xs text-gray-500 mt-1">
                            Confirmó: {formatDate(new Date(invitation.fechaRespuesta).getTime(), 'PPP')}
                          </p>
                        )}
                      </div>
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Otros</h3>
              <div className="space-y-2">
                {others.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {invitation.usuario?.nombre || 'Usuario'}
                          </p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getInvitationStatusColor(invitation.estado)}`}>
                            {getInvitationStatusText(invitation.estado)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{invitation.usuario?.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

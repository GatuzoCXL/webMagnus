import { EstadoInvitacion } from '../types'

export function getInvitationStatusText(estado: EstadoInvitacion): string {
  switch (estado) {
    case EstadoInvitacion.PendienteRespuesta:
      return 'Pendiente de respuesta'
    case EstadoInvitacion.PendienteAprobacion:
      return 'Pendiente de aprobación'
    case EstadoInvitacion.Confirmado:
      return 'Confirmado'
    case EstadoInvitacion.RechazadoPorInvitado:
      return 'Rechazado'
    case EstadoInvitacion.RechazadoPorOrganizador:
      return 'Rechazado por organizador'
    default:
      return 'Desconocido'
  }
}

export function getInvitationStatusColor(estado: EstadoInvitacion): string {
  switch (estado) {
    case EstadoInvitacion.PendienteRespuesta:
      return 'bg-yellow-100 text-yellow-800'
    case EstadoInvitacion.PendienteAprobacion:
      return 'bg-blue-100 text-blue-800'
    case EstadoInvitacion.Confirmado:
      return 'bg-green-100 text-green-800'
    case EstadoInvitacion.RechazadoPorInvitado:
    case EstadoInvitacion.RechazadoPorOrganizador:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getRoleName(rol: number): string {
  switch (rol) {
    case 0:
      return 'Cliente'
    case 1:
      return 'Organizador'
    case 2:
      return 'Administrador'
    default:
      return 'Usuario'
  }
}

import { api } from './api'
import { EventoInvitado, InvitarUsuarioRequest, AutopostularseRequest } from '../types'

export const invitationService = {
  async invitarUsuario(data: InvitarUsuarioRequest): Promise<EventoInvitado> {
    const response = await api.post<{ data: EventoInvitado }>('/api/EventoInvitados/invitar', data)
    return response.data.data
  },

  async autopostularse(data: AutopostularseRequest): Promise<EventoInvitado> {
    const response = await api.post<{ data: EventoInvitado }>('/api/EventoInvitados/autopostularse', data)
    return response.data.data
  },

  async aceptarInvitacion(id: string): Promise<void> {
    await api.put(`/api/EventoInvitados/${id}/aceptar`)
  },

  async rechazarInvitacion(id: string): Promise<void> {
    await api.put(`/api/EventoInvitados/${id}/rechazar`)
  },

  async aprobarAutopostulacion(id: string): Promise<void> {
    await api.put(`/api/EventoInvitados/${id}/aprobar`)
  },

  async rechazarAutopostulacion(id: string): Promise<void> {
    await api.put(`/api/EventoInvitados/${id}/rechazar-organizador`)
  },

  async obtenerInvitacionesPorEvento(eventoId: string): Promise<EventoInvitado[]> {
    const response = await api.get<{ data: EventoInvitado[] }>(`/api/EventoInvitados/evento/${eventoId}`)
    return response.data.data
  },

  async obtenerMisInvitaciones(): Promise<EventoInvitado[]> {
    const userStr = localStorage.getItem('user')
    if (!userStr) return []
    const user = JSON.parse(userStr)
    const response = await api.get<{ data: EventoInvitado[] }>(`/api/EventoInvitados/usuario/${user.id}`)
    return response.data.data
  },
}

import { api } from './api'
import { Event, CreateEventRequest } from '../types'

export const eventService = {
  async getEventsByOrganizer(organizadorId: string): Promise<Event[]> {
    const response = await api.get<any>(`/api/Eventos/organizador/${organizadorId}`)
    return Array.isArray(response.data) ? response.data : (response.data.data || [])
  },

  async getEventById(id: number): Promise<Event> {
    const response = await api.get<any>(`/api/Eventos/${id}`)
    return response.data.data || response.data
  },

  async createEvent(event: CreateEventRequest): Promise<Event> {
    const response = await api.post<any>('/api/Eventos', event)
    return response.data.data || response.data
  },

  async updateEvent(id: number, event: Partial<CreateEventRequest>): Promise<Event> {
    const response = await api.put<any>(`/api/Eventos/${id}`, event)
    return response.data.data || response.data
  },

  async deleteEvent(id: number): Promise<void> {
    await api.delete(`/api/Eventos/${id}`)
  },
}

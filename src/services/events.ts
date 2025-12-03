import { api } from './api'
import { Event, CreateEventRequest } from '../types'

const convertEventDates = (event: any): Event => ({
  ...event,
  fechaInicio: new Date(event.fechaInicio).getTime(),
  fechaFin: new Date(event.fechaFin).getTime()
})

export const eventService = {
  async getEventsByOrganizer(organizadorId: string): Promise<Event[]> {
    const response = await api.get<any>(`/api/Eventos/organizador/${organizadorId}`)
    const events = Array.isArray(response.data) ? response.data : (response.data.data || [])
    return events.map(convertEventDates)
  },

  async getEventById(id: string): Promise<Event> {
    const response = await api.get<any>(`/api/Eventos/${id}`)
    const event = response.data.data || response.data
    return convertEventDates(event)
  },

  async createEvent(event: CreateEventRequest): Promise<Event> {
    const response = await api.post<any>('/api/Eventos', event)
    const createdEvent = response.data.data || response.data
    return convertEventDates(createdEvent)
  },

  async updateEvent(id: string, event: Partial<CreateEventRequest>): Promise<Event> {
    const response = await api.put<any>(`/api/Eventos/${id}`, event)
    const updatedEvent = response.data.data || response.data
    return convertEventDates(updatedEvent)
  },

  async deleteEvent(id: string): Promise<void> {
    await api.delete(`/api/Eventos/${id}`)
  },
}

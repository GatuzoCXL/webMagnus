import { api } from './api'

export interface Organizador {
  id: string
  nombreEmpresa: string
  descripcion?: string
  telefono: string
  direccion?: string
  precioPorEvento: number
  añosExperiencia: number
  especialidad?: string
  verificado: boolean
  rating: number
  cantidadReseñas: number
  usuarioId: string
}

export interface CreateOrganizadorRequest {
  nombreEmpresa: string
  descripcion?: string
  telefono: string
  direccion?: string
  precioPorEvento: number
  añosExperiencia: number
  especialidad?: string
  usuarioId: string
}

export const organizadorService = {
  async getAll(): Promise<Organizador[]> {
    const response = await api.get<{ data: Organizador[] }>('/api/Organizadores')
    return response.data.data
  },

  async getById(id: string): Promise<Organizador> {
    const response = await api.get<{ data: Organizador }>(`/api/Organizadores/${id}`)
    return response.data.data
  },

  async getByUsuarioId(usuarioId: string): Promise<Organizador> {
    const response = await api.get<{ data: Organizador }>(`/api/Organizadores/usuario/${usuarioId}`)
    return response.data.data
  },

  async create(data: CreateOrganizadorRequest): Promise<Organizador> {
    const response = await api.post<{ data: Organizador }>('/api/Organizadores', data)
    return response.data.data
  },
}

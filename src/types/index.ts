export interface User {
  id: string
  nombre: string
  email: string
  createdAt?: string
}

export interface Event {
  id: number
  titulo: string
  descripcion: string
  fechaInicio: number
  fechaFin: number
  lugar: string
  capacidad: number
  organizadorId: string
  estado?: EventStatus
}

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface LoginRequest {
  email: string
  contrasena: string
}

export interface RegisterRequest {
  nombre: string
  email: string
  contrasena: string
  rol: string
}

export interface CreateEventRequest {
  titulo: string
  descripcion: string
  fechaInicio: number
  fechaFin: number
  lugar: string
  capacidad: number
  organizadorId: string
}

export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
}

export interface AuthResponse {
  token: string
  user: User
  expiresAtUtc: string
}

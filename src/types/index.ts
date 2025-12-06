export interface User {
  id: string
  nombre: string
  email: string
  rol: number
  createdAt?: string
}

export enum Rol {
  Cliente = 0,
  Organizador = 1,
  Administrador = 2
}

export interface Event {
  id: string
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

export interface EventoInvitado {
  id: string
  eventoId: string
  usuarioId: string
  estado: EstadoInvitacion
  esAutopostulacion: boolean
  fechaInvitacion: string
  fechaRespuesta?: string
  mensaje?: string
  evento?: Event
  usuario?: User
}

export enum EstadoInvitacion {
  PendienteRespuesta = 0,
  PendienteAprobacion = 1,
  Confirmado = 2,
  RechazadoPorInvitado = 3,
  RechazadoPorOrganizador = 4
}

export interface LoginRequest {
  email: string
  contrasena: string
}

export interface RegisterRequest {
  nombre: string
  email: string
  contrasena: string
  rol?: number
}

export interface CreateEventRequest {
  titulo: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
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

export interface InvitarUsuarioRequest {
  eventoId: string
  usuarioId: string
  mensaje?: string
}

export interface AutopostularseRequest {
  eventoId: string
  mensaje?: string
}

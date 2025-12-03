import { api } from './api'
import { LoginRequest, RegisterRequest, AuthResponse } from '../types'

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<any>('/api/Auth/login', {
      email: credentials.email,
      password: credentials.contrasena
    })
    return response.data.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    await api.post<any>('/api/Auth/registrar', {
      nombre: data.nombre,
      email: data.email,
      password: data.contrasena
    })
    return await authService.login({ email: data.email, contrasena: data.contrasena })
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  getUser(): any | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  saveAuth(token: string, user: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },
}

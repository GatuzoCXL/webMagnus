import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginRequest, RegisterRequest } from '../types'
import { authService } from '../services/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = authService.getUser()
    const token = authService.getToken()
    
    if (savedUser && token) {
      setUser(savedUser)
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials)
    authService.saveAuth(response.token, response.user)
    setUser(response.user)
  }

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data)
    authService.saveAuth(response.token, response.user)
    setUser(response.user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar si hay tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    // Si no hay tema guardado, usar la preferencia del sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return savedTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover ambas clases primero
    root.classList.remove('light', 'dark')
    
    // Agregar la clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

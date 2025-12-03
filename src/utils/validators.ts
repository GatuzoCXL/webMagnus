export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' }
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra minúscula' }
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos una letra mayúscula' }
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, message: 'La contraseña debe contener al menos un número' }
  }
  
  return { valid: true }
}

export function validateEventTitle(title: string): boolean {
  return title.trim().length >= 3
}

export function validateEventCapacity(capacity: number): boolean {
  return capacity > 0 && capacity <= 10000
}

export function validateEventDates(start: number, end: number): { valid: boolean; message?: string } {
  const now = Date.now()
  
  if (start < now) {
    return { valid: false, message: 'La fecha de inicio debe ser futura' }
  }
  
  if (end <= start) {
    return { valid: false, message: 'La fecha de fin debe ser posterior a la de inicio' }
  }
  
  return { valid: true }
}

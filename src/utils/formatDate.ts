import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale/es'

export function formatDate(timestamp: number, formatStr: string = 'PPP'): string {
  return format(new Date(timestamp), formatStr, { locale: es })
}

export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp), 'PPP p', { locale: es })
}

export function formatTime(timestamp: number): string {
  return format(new Date(timestamp), 'p', { locale: es })
}

export function formatRelativeTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp), { locale: es, addSuffix: true })
}

export function formatEventDateRange(start: number, end: number): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  const startStr = format(startDate, 'PPP p', { locale: es })
  const endStr = format(endDate, 'p', { locale: es })
  
  return `${startStr} - ${endStr}`
}

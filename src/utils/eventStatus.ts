import { Event, EventStatus } from '../types'

export function getEventStatus(event: Event): EventStatus {
  const now = Date.now()
  const start = event.fechaInicio
  const end = event.fechaFin

  console.log('Estado del evento:', {
    titulo: event.titulo,
    now: new Date(now).toISOString(),
    start: new Date(start).toISOString(),
    end: new Date(end).toISOString(),
    nowTimestamp: now,
    startTimestamp: start,
    endTimestamp: end
  })

  if (end < now) {
    return EventStatus.COMPLETED
  } else if (start <= now && now <= end) {
    return EventStatus.IN_PROGRESS
  } else {
    return EventStatus.UPCOMING
  }
}

export function canDeleteEvent(event: Event): boolean {
  return getEventStatus(event) === EventStatus.UPCOMING
}

export function canEditEvent(event: Event): boolean {
  return getEventStatus(event) === EventStatus.UPCOMING
}

export function getStatusText(status: EventStatus): string {
  switch (status) {
    case EventStatus.UPCOMING:
      return 'Próximo'
    case EventStatus.IN_PROGRESS:
      return 'En curso'
    case EventStatus.COMPLETED:
      return 'Finalizado'
    case EventStatus.CANCELLED:
      return 'Cancelado'
    default:
      return 'Desconocido'
  }
}

export function getStatusColor(status: EventStatus): string {
  switch (status) {
    case EventStatus.UPCOMING:
      return 'bg-info text-white'
    case EventStatus.IN_PROGRESS:
      return 'bg-warning text-white'
    case EventStatus.COMPLETED:
      return 'bg-success text-white'
    case EventStatus.CANCELLED:
      return 'bg-error text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

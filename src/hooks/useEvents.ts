import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { eventService } from '../services/events'
import { CreateEventRequest } from '../types'

export function useEvents(organizadorId: string) {
  return useQuery({
    queryKey: ['events', organizadorId],
    queryFn: () => eventService.getEventsByOrganizer(organizadorId),
    enabled: !!organizadorId,
  })
}

export function useEvent(eventId: string) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventService.getEventById(eventId),
    enabled: !!eventId,
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (event: CreateEventRequest) => eventService.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, event }: { id: string; event: Partial<CreateEventRequest> }) =>
      eventService.updateEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['event'] })
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invitationService } from '../services/invitations'
import { InvitarUsuarioRequest, AutopostularseRequest } from '../types'

export function useEventInvitations(eventoId: string) {
  return useQuery({
    queryKey: ['invitations', 'event', eventoId],
    queryFn: () => invitationService.obtenerInvitacionesPorEvento(eventoId),
    enabled: !!eventoId,
  })
}

export function useMyInvitations() {
  return useQuery({
    queryKey: ['invitations', 'my'],
    queryFn: () => invitationService.obtenerMisInvitaciones(),
  })
}

export function useInviteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: InvitarUsuarioRequest) => invitationService.invitarUsuario(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations', 'event', variables.eventoId] })
    },
  })
}

export function useSelfRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AutopostularseRequest) => invitationService.autopostularse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations', 'my'] })
    },
  })
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => invitationService.aceptarInvitacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
    },
  })
}

export function useRejectInvitation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => invitationService.rechazarInvitacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
    },
  })
}

export function useApproveInvitation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => invitationService.aprobarAutopostulacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
    },
  })
}

export function useRejectInvitationByOrganizer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => invitationService.rechazarAutopostulacion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { organizadorService, CreateOrganizadorRequest } from '../services/organizadores'

export function useOrganizadores() {
  return useQuery({
    queryKey: ['organizadores'],
    queryFn: () => organizadorService.getAll(),
  })
}

export function useOrganizador(id: string) {
  return useQuery({
    queryKey: ['organizador', id],
    queryFn: () => organizadorService.getById(id),
    enabled: !!id,
  })
}

export function useOrganizadorByUsuarioId(usuarioId: string | undefined) {
  return useQuery({
    queryKey: ['organizador', 'usuario', usuarioId],
    queryFn: () => organizadorService.getByUsuarioId(usuarioId!),
    enabled: !!usuarioId,
    retry: false,
  })
}

export function useCreateOrganizador() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateOrganizadorRequest) => organizadorService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['organizadores'] })
      // Invalidate the user's organizador query to trigger reload
      queryClient.invalidateQueries({ queryKey: ['organizador', 'usuario', data.usuarioId] })
    },
  })
}

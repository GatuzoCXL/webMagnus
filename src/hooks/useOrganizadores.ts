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

export function useCreateOrganizador() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateOrganizadorRequest) => organizadorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizadores'] })
    },
  })
}

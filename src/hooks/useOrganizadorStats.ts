import { useQuery } from '@tanstack/react-query'
import { organizadorService, type OrganizadorStats } from '../services/organizadores'

export function useOrganizadorStats(id?: string) {
  return useQuery<OrganizadorStats>({
    queryKey: ['organizadorStats', id],
    queryFn: () => organizadorService.getStats(id!),
    enabled: !!id,
  })
}

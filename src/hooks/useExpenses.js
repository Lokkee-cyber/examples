import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../api/expenses';
import { useUIStore } from '../store/useUIStore';

export function useExpenses() {
  const filters = useUIStore((state) => state.filters);
  
  return useQuery({
    queryKey: ['expenses', filters],
    queryFn: () => getExpenses(filters),
  });
}
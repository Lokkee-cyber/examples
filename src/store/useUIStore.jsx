import { create } from 'zustand'


export const useUIStore = create((set) => ({
    month: '2025-01',
    category: 'All',
    year: '2025',
    setYear: (newYear) => set({ year: newYear }),
    setMonth: (newMonth) => set({ month: newMonth }),
    setCategory: (category) => set({ category }),
    
    themeMode: 'light',


toggleTheme:() =>
  set((state) => ({
    themeMode: state.themeMode === 'light' ? 'dark' : 'light',
})),
filters: { month: '', category: 'All' },
setFilters: (filters) => set({ filters }),
}))
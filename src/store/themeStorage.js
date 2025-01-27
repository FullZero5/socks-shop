import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const storage = createJSONStorage(() => localStorage)

const isClient = typeof window !== 'undefined'

export const useThemeStore = create()(
  persist(
    (set) => ({
      theme: 'light',
      isDark: false,
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          return { theme: newTheme, isDark: newTheme === 'dark' }
        }),
    }),
    {
      name: 'theme',
      storage: isClient ? storage : undefined,
    },
  ),
)

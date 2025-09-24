import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink';

interface ThemeState {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
  nextColor: () => void;
}

const themeColors: ThemeColor[] = ['blue', 'green', 'purple', 'orange', 'pink'];

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      color: 'green',
      setColor: (color) => set({ color }),
      nextColor: () => {
        const currentIndex = themeColors.indexOf(get().color);
        const nextIndex = (currentIndex + 1) % themeColors.length;
        set({ color: themeColors[nextIndex] });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const getThemeClasses = (color: ThemeColor) => {
  const baseClasses = {
    background: 'bg-[#0a0b0d]',
    text: 'text-[#fffffa]',
    textSecondary: 'text-gray-300',
    cardBg: 'bg-[#1a1b1e]',
    searchBg: 'bg-[#2a2b2e]',
    border: 'border-[#2a2b2e]',
    searchBorder: 'border-[#1a1b1e]',
    hoverBg: 'hover:bg-[#2a2b2e]',
  };

  const colorClasses = {
    blue: {
      primary: 'text-[#3b82f6]',
      primaryBg: 'bg-[#3b82f6]',
      primaryHover: 'hover:bg-[#2563eb]',
      border: 'border-[#3b82f6]',
      accent: 'accent-[#3b82f6]',
    },
    green: {
      primary: 'text-[#10b981]',
      primaryBg: 'bg-[#10b981]',
      primaryHover: 'hover:bg-[#059669]',
      border: 'border-[#10b981]',
      accent: 'accent-[#10b981]',
    },
    purple: {
      primary: 'text-[#8b5cf6]',
      primaryBg: 'bg-[#8b5cf6]',
      primaryHover: 'hover:bg-[#7c3aed]',
      border: 'border-[#8b5cf6]',
      accent: 'accent-[#8b5cf6]',
    },
    orange: {
      primary: 'text-[#f97316]',
      primaryBg: 'bg-[#f97316]',
      primaryHover: 'hover:bg-[#ea580c]',
      border: 'border-[#f97316]',
      accent: 'accent-[#f97316]',
    },
    pink: {
      primary: 'text-[#ec4899]',
      primaryBg: 'bg-[#ec4899]',
      primaryHover: 'hover:bg-[#db2777]',
      border: 'border-[#ec4899]',
      accent: 'accent-[#ec4899]',
    },
  };

  return {
    ...baseClasses,
    ...colorClasses[color],
  };
};

import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useThemeStore } from '../../store/themeStorage'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useThemeStore()
  const applyTheme = (isDark) => {
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }

  React.useEffect(() => {
    applyTheme(isDark)
  }, [isDark])

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="mr-2 h-8 w-8 rounded-full bg-background"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
            <MoonIcon className="scale-1000 absolute h-[1.2rem] w-[1.2rem] rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

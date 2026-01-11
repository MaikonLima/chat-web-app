import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/theme.store';
import type { ComponentProps } from 'react';

type Props = {
  variant?: ComponentProps<typeof Button>['variant'];
};

export function ThemeToggle({variant = "ghost"}: Props) {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <Button
            variant={variant}
            size="icon"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="hover:cursor-pointer"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
}

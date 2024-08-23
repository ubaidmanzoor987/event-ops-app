import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

export function DarkToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Switch
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      className="flex items-center space-x-2"
    >
      <span className="sr-only">Dark mode</span>
    </Switch>
  );
}

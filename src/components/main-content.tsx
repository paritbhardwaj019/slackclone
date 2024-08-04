'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-prefrences';
import { useTheme } from 'next-themes';

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { themes, theme } = useTheme();
  const { color } = useColorPrefrences();

  let backgroundColor = 'bg-primary-dark';

  if (color === 'green') {
    backgroundColor = 'bg-green-700';
  } else if (color === 'blue') {
    backgroundColor = 'bg-blue-700';
  }

  return (
    <div
      className={cn('md:px-2 md:pb-2 md:pt-14 md:h-screen', backgroundColor)}
    >
      <main
        className={cn(
          'md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-scroll [&&::-webkit-scrollbar-thumb]:rounded-[6px] [&&::-webkit-scrollbar-thumb]:bg-foreground/60 [&&::-webkit-scrollbar-track]:bg-none [&&::-webkit-scrollbar]:w-2',
          theme === 'dark' ? 'bg-[#232529]' : 'bg-white',
        )}
      >
        {children}
      </main>
    </div>
  );
};

import React from 'react';
import { MainContent } from '@/components/main-content';
import { ColorPrefrencesProvider } from '@/providers/color-prefrences';
import ComposeProviders from '@/providers/compose-providers';
import { ThemeProvider } from '@/providers/theme-provider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ComposeProviders
      Providers={[
        {
          component: ThemeProvider,
          props: {
            attribute: 'class',
            defaultTheme: 'light',
            enableSystem: true,
            disableTransitionOnChange: true,
          },
        },
        {
          component: ColorPrefrencesProvider,
        },
        {
          component: MainContent,
        },
      ]}
    >
      {children}
    </ComposeProviders>
  );
}

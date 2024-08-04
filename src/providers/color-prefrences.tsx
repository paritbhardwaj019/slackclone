'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Colors = 'blue' | 'green' | null;

interface ColorPrefrencesContext {
  color: Colors;
  selectColor: (color: Colors) => void;
}

const ColorPrefrencesContext = createContext<
  ColorPrefrencesContext | undefined
>(undefined);

export const useColorPrefrences = () => {
  const context = useContext(ColorPrefrencesContext);

  if (!context)
    throw new Error(
      'useColorPrefrences must be used with a ColorPrefrencesProvider',
    );

  return context;
};

export const ColorPrefrencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [color, setColor] = useState<Colors | null>(() => {
    const storedColor =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('selectedColor')
        : '';
    return (storedColor as Colors) || null;
  });

  const [isMounted, setIsMounted] = useState(false);

  const selectColor = (color: Colors) => setColor(color);

  useEffect(() => {
    if (color !== null && typeof window !== 'undefined') {
      window.localStorage.setItem('selectedColor', color);
    }
    setIsMounted(true);
  }, [color]);

  const value: ColorPrefrencesContext = {
    color,
    selectColor,
  };

  if (!isMounted) return null;

  return (
    <ColorPrefrencesContext.Provider value={value}>
      {children}
    </ColorPrefrencesContext.Provider>
  );
};

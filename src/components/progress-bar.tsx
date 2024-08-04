'use client';

import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((prev) => (prev + 1) % 100),
      100,
    );

    return () => clearInterval(interval);
  }, []);

  return <Progress className="bg-green-900" value={progress} max={100} />;
};

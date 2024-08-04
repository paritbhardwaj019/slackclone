'use client';

import { COLORS } from '@/constants';
import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-prefrences';
import { useTheme } from 'next-themes';
import { BsLaptop } from 'react-icons/bs';
import { FaBan } from 'react-icons/fa6';
import { HiOutlinePaintBrush } from 'react-icons/hi2';
import { IoSettings } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Typography } from './typography';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const PreferencesDialog = () => {
  const { setTheme, theme } = useTheme();
  const { selectColor, color } = useColorPrefrences();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Typography
          variant="p"
          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
        >
          Preferences
        </Typography>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4" className="font-semibold">
              Preferences
            </Typography>
          </DialogTitle>
          <Tabs orientation="horizontal" defaultValue="themes" className="py-2">
            <TabsList className="h-12 w-full px-[6px] ">
              <TabsTrigger value="themes" className="w-full">
                <HiOutlinePaintBrush className="mr-2" />
                <Typography variant="p">Themes</Typography>
              </TabsTrigger>
              <TabsTrigger value="settings" className="w-full">
                <IoSettings className="mr-2" />
                <Typography variant="p">Settings</Typography>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="themes">
              <Typography variant="p" className="py-2 font-bold">
                Color Mode
              </Typography>
              <Typography variant="p" className="pb-4">
                Choose if slack appearance should be light or dark, or follow
                the computer settings.
              </Typography>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setTheme('light')}
                  className={cn('w-full', {
                    'border-blue-600': theme === 'light',
                  })}
                >
                  <MdLightMode className="mr-2" size={20} />
                  <Typography variant="p">Light</Typography>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTheme('dark')}
                  className={cn('w-full', {
                    'border-blue-600': theme === 'dark',
                  })}
                >
                  <MdDarkMode className="mr-2" size={20} />
                  <Typography variant="p">Dark</Typography>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTheme('system')}
                  className={cn('w-full', {
                    'border-blue-600': theme === 'system',
                  })}
                >
                  <BsLaptop className="mr-2" size={20} />
                  <Typography variant="p">System</Typography>
                </Button>
              </div>

              <Separator className="my-5" />
              <Typography variant="p" className="py-2 font-bold">
                Single Color
              </Typography>

              <div className="flex flex-wrap gap-5">
                {COLORS.map((el, index) => (
                  <div
                    className={cn(
                      'rounded-full h-8 w-8 cursor-pointer',
                      `bg-${el}-700`,
                      color === el ? `ring-2 ring-white` : '',
                    )}
                    key={index}
                    onClick={() => selectColor(el)}
                  />
                ))}
                <FaBan
                  size={34}
                  className={cn(
                    'rounded-full cursor-pointer text-gray-500',
                    !color && 'ring-2',
                  )}
                  onClick={() => selectColor(null)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

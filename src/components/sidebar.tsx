'use client';

import { SidebarNav } from '@/components/sidebar-nav';
import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-prefrences';
import { User, Workspace } from '@/types/app';
import Image from 'next/image';
import { FaPencil, FaRegCalendarCheck } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { GiNightSleep } from 'react-icons/gi';
import { GoDot, GoDotFill } from 'react-icons/go';
import { IoDiamondOutline } from 'react-icons/io5';
import { PreferencesDialog } from './preferences-dialog';
import { Typography } from './typography';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface SidebarProps {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
  user: User;
}

export const Sidebar = ({
  userWorkspaceData,
  currentWorkspaceData,
  user,
}: SidebarProps) => {
  const { color } = useColorPrefrences();

  let backgroundColor = 'bg-primary-dark';

  if (color === 'green') backgroundColor = 'bg-green-700';
  if (color === 'blue') backgroundColor = 'bg-blue-700';

  return (
    <aside className="fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20">
      <SidebarNav
        userWorkspaceData={userWorkspaceData}
        currentWorkspaceData={currentWorkspaceData}
      />
      <div className="flex flex-col space-y-4">
        <div className="bg-black/30 cursor-pointer transition-all duration-300 hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10">
          <FiPlus size={28} />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          src={user.avatar_url}
                          className="object-cover h-full w-full"
                          alt={user.name as string}
                          width={300}
                          height={300}
                        />

                        <div
                          className={cn(
                            'absolute z-10 rounded-full -right-[20%] -bottom-1',
                            backgroundColor,
                          )}
                        >
                          {user.is_away ? (
                            <GoDot className="text-white" />
                          ) : (
                            <GoDotFill className="text-green-600" size={18} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>
                            {user.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col ">
                          <Typography variant="p" className="font-bold">
                            {user.name || user.email}
                          </Typography>

                          <div className="flex items-center space-x-0.5">
                            {user.is_away ? (
                              <GiNightSleep size={12} />
                            ) : (
                              <GoDotFill size={17} className="text-green-600" />
                            )}
                            <Typography
                              variant="p"
                              className="text-xs lg:text-xs"
                            >
                              {user.is_away ? 'Away' : 'Active'}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="border group cursor-pointer mt-4 mb-2 p-2 rounded flex items-center space-x-2">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencil
                          className="hidden group-hover:block"
                          size={14}
                        />
                        <Typography
                          variant="p"
                          className="text-xs text-gray-600"
                        >
                          In a meeting
                        </Typography>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        >
                          {user.is_away
                            ? 'Set yourself active'
                            : 'Set yourself away'}
                        </Typography>
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        >
                          Clear Status
                        </Typography>
                        <Separator />
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        >
                          Profile
                        </Typography>

                        <PreferencesDialog />

                        <Separator />

                        <div className="flex items-center gap-2 hover:text-white hover:bg-blue-700 px-2 py-1.5 rounded cursor-pointer">
                          <IoDiamondOutline className="text-orange-400" />
                          <Typography variant="p" className="text-xs ">
                            Upgrade {currentWorkspaceData.name}
                          </Typography>
                        </div>
                        <Typography
                          variant="p"
                          className="hover:text-white hover:bg-blue-700 px-2 py-1.5 rounded cursor-pointer"
                        >
                          Signout of {currentWorkspaceData.name}
                        </Typography>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-white bg-black " side="right">
              <Typography variant="p">{user.name || user.email}</Typography>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

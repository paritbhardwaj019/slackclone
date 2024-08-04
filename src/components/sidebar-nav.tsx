import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Workspace } from '@/types/app';
import { Popover } from '@radix-ui/react-popover';
import { useRouter } from 'next/navigation';
import { PiChatsTeardrop } from 'react-icons/pi';
import { RiHome2Fill } from 'react-icons/ri';
import { CreateWorkspace } from './create-workspace';
import { Typography } from './typography';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

interface SidebarNavProps {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
}

export const SidebarNav = ({
  userWorkspaceData,
  currentWorkspaceData,
}: SidebarNavProps) => {
  const router = useRouter();

  function switchWorkspace(id: string) {
    router.push('/workspace' + '/' + id);
  }

  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={currentWorkspaceData.image_url || ''}
                    alt={currentWorkspaceData.name}
                    className="object-cover w-full h-full"
                  ></AvatarImage>
                  <AvatarFallback className="bg-neutral-700">
                    <Typography variant="p">
                      {currentWorkspaceData.name.toUpperCase().slice(0, 2)}
                    </Typography>
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent side="right" className="p-0 w-[350px]">
                <Card className="p-0">
                  <CardContent className="flex p-0 flex-col">
                    {userWorkspaceData.map((el) => {
                      const isActive = currentWorkspaceData.id === el.id;
                      return (
                        <div
                          key={el.id}
                          className={cn(
                            'hover:opacity-70 px-2 py-3 flex gap-2 cursor-pointer ',
                            isActive && 'bg-neutral-700 text-white',
                          )}
                          onClick={() => switchWorkspace(el.id)}
                        >
                          <Avatar>
                            <AvatarImage
                              src={el.image_url || ''}
                              alt={el.name}
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback className="bg-neutral-700">
                              <Typography variant="p">
                                {el.name.toUpperCase().slice(0, 2)}
                              </Typography>
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Typography
                              variant="h3"
                              className="text-sm lg:text-sm"
                            >
                              {el.name}
                            </Typography>
                            <Typography
                              variant="p"
                              className="text-xs lg:text-xs"
                            >
                              {el.invite_code}
                            </Typography>
                          </div>
                        </div>
                      );
                    })}

                    <Separator />

                    <CreateWorkspace />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg ">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography variant="p" className="text-sm lg:text-sm md:text-sm">
              Home
            </Typography>
          </div>
        </li>
        <li>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg ">
              <PiChatsTeardrop
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography variant="p" className="text-sm lg:text-sm md:text-sm">
              DMs
            </Typography>
          </div>
        </li>
      </ul>
    </nav>
  );
};

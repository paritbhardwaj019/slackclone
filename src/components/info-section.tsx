'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useColorPrefrences } from '@/providers/color-prefrences';
import { User, Workspace } from '@/types/app';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa6';
import { CreateChannelDialog } from './create-channel-dialog';
import { Typography } from './typography';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

export const InfoSection = ({
  currentWorkspaceData,
  user,
}: {
  currentWorkspaceData: Workspace;
  user: User;
}) => {
  const { color } = useColorPrefrences();

  const [isChannelCollapsed, setIsChannelCollapsed] = useState(false);
  const [isDirectMessageCollapsed, setIsDirectMessageCollapsed] =
    useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  let backgroundColor = 'bg-primary-light';

  if (color === 'green') {
    backgroundColor = 'bg-green-900';
  } else if (color === 'blue') {
    backgroundColor = 'bg-blue-900';
  }

  return (
    <div
      className={cn(
        'fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center',
        backgroundColor,
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div className="">
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={() => setIsChannelCollapsed((prev) => !prev)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p">Channels</Typography>
              </CollapsibleTrigger>

              <div
                className={cn(
                  'cursor-pointer p-2 rounded-full hover:bg-black/20',
                )}
                onClick={() => setDialogOpen(true)}
              >
                <FaPlus />
              </div>
            </div>

            <CollapsibleContent>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                # channel-name-1
              </Typography>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                # channel-name-2
              </Typography>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                # channel-name-3
              </Typography>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                # channel-name-4
              </Typography>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          <Collapsible
            open={isDirectMessageCollapsed}
            onOpenChange={() => setIsDirectMessageCollapsed((prev) => !prev)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between ">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDirectMessageCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p">Direct Messages</Typography>
              </CollapsibleTrigger>

              <div
                className={cn(
                  'cursor-pointer p-2 rounded-full hover:bg-black/20',
                )}
              >
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                Parit Bhardwaj
              </Typography>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                Ritik Kumar Gahlot
              </Typography>
              <Typography
                variant="p"
                className={cn(
                  'px-2 py-1 rounded-sm cursor-pointer hover:bg-black/20',
                )}
              >
                Manish Kumar
              </Typography>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <CreateChannelDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        workspaceId={currentWorkspaceData.id}
        userId={user.id}
      />
    </div>
  );
};

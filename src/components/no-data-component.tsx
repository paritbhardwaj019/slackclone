'use client';

import { useState } from 'react';
import { CreateChannelDialog } from './create-channel-dialog';
import { Typography } from './typography';
import { Button } from './ui/button';

export const NoDataComponent = ({
  workspaceName,
  workspaceId,
  userId,
}: {
  workspaceName: string;
  userId: string;
  workspaceId: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-full h-[calc(100vh-63px)] p-4">
      <Typography variant="h3" className="mt-2">
        👋 Welcome to the # {workspaceName}
      </Typography>
      <Typography variant="p" className="my-2">
        Get started by creating a channel or direct messages
      </Typography>

      <div className="w-fit">
        <Button className="w-full my-6" onClick={() => setDialogOpen(true)}>
          <Typography variant="p">Create channel</Typography>
        </Button>
      </div>

      <CreateChannelDialog
        workspaceId={workspaceId}
        userId={userId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

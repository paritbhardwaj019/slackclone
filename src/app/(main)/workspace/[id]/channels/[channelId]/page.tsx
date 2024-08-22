import { ChatHeader } from '@/components/chat-header';
import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
import { TextEditor } from '@/components/text-editor';
import { getUserWorkspaceChannels } from '@/lib/actions/channel';
import { getUserDetails } from '@/lib/actions/user';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/lib/actions/workspace';
import { Channel, Workspace } from '@/types/app';
import { redirect } from 'next/navigation';

export default async function ChannelPage({
  params: { id, channelId },
}: {
  params: { channelId: string; id: string };
}) {
  const user = await getUserDetails();

  if (!user) redirect('/auth');

  const [data] = await getUserWorkspaceData({
    workspaceIds: user.workspaces!,
  });

  const [currentWorkspaceData] = await getCurrentWorkspaceData(id);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    user.id,
  );

  const currentChannelData = userWorkspaceChannels.find(
    (el) => el.id === channelId,
  );

  return (
    <>
      <div className="hidden md:block">
        <div className="h-[calc(100vh-256px)] overflow-y-auto  [&&::-webkit-scrollbar-thumb]:rounded-[6px] [&&::-webkit-scrollbar-thumb]:bg-foreground/60 [&&::-webkit-scrollbar-track]:bg-none [&&::-webkit-scrollbar]:w-2">
          <Sidebar
            currentWorkspaceData={currentWorkspaceData}
            userWorkspaceData={data as Workspace[]}
            user={user}
          />
          <InfoSection
            currentWorkspaceData={currentWorkspaceData}
            user={user}
            userWorkspaceChannels={userWorkspaceChannels}
            currentChannelId=""
          />

          <div className="p-4 relative w-full overflow-hidden">
            <ChatHeader title={currentChannelData?.name as string} />

            <div className="mt-14">Chat content</div>
          </div>
        </div>

        <div className="m-4">
          <TextEditor currentChannelData={currentChannelData as Channel} />
        </div>
      </div>
    </>
  );
}

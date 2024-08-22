import { InfoSection } from '@/components/info-section';
import { NoDataComponent } from '@/components/no-data-component';
import { Sidebar } from '@/components/sidebar';
import { getUserWorkspaceChannels } from '@/lib/actions/channel';
import { getUserDetails } from '@/lib/actions/user';
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from '@/lib/actions/workspace';
import { Workspace } from '@/types/app';
import { redirect } from 'next/navigation';

export default async function ({ params: { id } }: { params: { id: string } }) {
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

  if (userWorkspaceChannels.length) {
    redirect(
      `/workspace/${currentWorkspaceData.id}/channels/${userWorkspaceChannels[0].id}`,
    );
  }

  return (
    <>
      <div className="hidden md:block">
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

        <NoDataComponent
          userId={user.id}
          workspaceId={currentWorkspaceData.id}
          workspaceName={currentWorkspaceData.name}
        />
      </div>

      <div className="block md:hidden min-h-screen">Mobile</div>
    </>
  );
}

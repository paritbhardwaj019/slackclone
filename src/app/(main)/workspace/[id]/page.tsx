import { InfoSection } from '@/components/info-section';
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
        />
        Workspace
      </div>

      <div className="block md:hidden min-h-screen">Mobile</div>
    </>
  );
}

import { InfoSection } from '@/components/info-section';
import { Sidebar } from '@/components/sidebar';
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

  const [data, error] = await getUserWorkspaceData({
    workspaceIds: user.workspaces!,
  });

  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id);

  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userWorkspaceData={data as Workspace[]}
          user={user}
        />
        <InfoSection />
        Workspace
      </div>

      <div className="block md:hidden min-h-screen">Mobile</div>
    </>
  );
}

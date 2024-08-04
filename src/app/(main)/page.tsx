import { Button } from '@/components/ui/button';
import { getUserDetails } from '@/lib/actions/user';
import { redirect } from 'next/navigation';

export default async function () {
  const user = await getUserDetails();

  if (!user) return redirect('/auth');

  const userWorkSpaceId = user?.workspaces?.at(0);

  if (!userWorkSpaceId) redirect('/create-workspace');

  if (userWorkSpaceId) redirect(`/workspace/${userWorkSpaceId}`);

  return (
    <main>
      <Button variant="outline">Home</Button>
    </main>
  );
}

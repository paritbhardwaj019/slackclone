'use server';

import { createClient } from '@/utils/supabase/server';
import { getUserDetails } from './user';

const updateUserWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {};

const createWorkspace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  const supabase = await createClient();
  const user = await getUserDetails();

  if (!user) return { error: 'User not found' };

  const { error, data } = await supabase
    .from('workspaces')
    .insert({
      image_url: imageUrl,
      name,
      super_admin: user.id,
      slug,
      invite_code,
    })
    .select('*');

  if (error) return { insertError: error };

  await updateUserWorkspace({ userId: user.id, workspaceId: data[0]?.id });
};

export { createWorkspace };

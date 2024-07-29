'use server';

import { createClient } from '@/utils/supabase/server';
import { getUserDetails } from './user';

const updateUserWorkspace = async ({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('add_workspace_to_user', {
    user_id: userId,
    new_workspace: workspaceId,
  });

  return {
    data,
    error,
  };
};

const addMembersToWorkspace = async ({
  workspaceId,
  userId,
}: {
  userId: string;
  workspaceId: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('add_member_to_workspace', {
    user_id: userId,
    workspace_id: workspaceId,
  });

  return {
    data,
    error,
  };
};

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

  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await updateUserWorkspace({ userId: user.id, workspaceId: data[0]?.id });

  if (updateWorkspaceError) return { error: updateWorkspaceError };

  const { data: addMembersToWorkspaceData, error: addMembersToWorkspaceError } =
    await addMembersToWorkspace({
      userId: user.id,
      workspaceId: data[0]?.id,
    });

  if (addMembersToWorkspaceError) return { error: addMembersToWorkspaceError };
};

export { createWorkspace };

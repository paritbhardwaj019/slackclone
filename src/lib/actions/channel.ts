'use server';

import { Channel } from '@/types/app';
import { createClient } from '@/utils/supabase/server';
import { getUserDetails } from './user';

const updateChannelMembers = async ({
  newMemberId,
  channelId,
}: {
  newMemberId: string;
  channelId: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('update_channel_members', {
    new_member_id: newMemberId,
    channel_id: channelId,
  });

  return {
    data,
    error,
  };
};

const updateUserChannels = async ({
  userId,
  channelId,
}: {
  userId: string;
  channelId: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('update_user_channel', {
    user_id: userId,
    channel_id: channelId,
  });

  return {
    data,
    error,
  };
};

const updateWorkspaceChannel = async ({
  workspaceId,
  channelId,
}: {
  workspaceId: string;
  channelId: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('add_channel_to_workspace', {
    workspace_id: workspaceId,
    channel_id: channelId,
  });

  return {
    data,
    error,
  };
};

const createChannel = async ({
  name,
  userId,
  workspaceId,
}: {
  name: string;
  userId: string;
  workspaceId: string;
}) => {
  const supabase = await createClient();
  const user = await getUserDetails();

  if (!user) {
    return { error: 'No user authenticated' };
  }

  const { error, data } = await supabase
    .from('channels')
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select('*');

  if (error) return { error: 'Unable to create channel' };

  const { data: updateChannelData, error: updateChannelError } =
    await updateChannelMembers({
      newMemberId: userId,
      channelId: data[0]?.id,
    });

  if (updateChannelError) return { error: 'Unable to update channel members' };

  const { data: updateUserChannelData, error: updateUserChannelError } =
    await updateUserChannels({
      userId,
      channelId: data[0]?.id,
    });

  if (updateUserChannelError)
    return { error: 'Unable to update users channel' };

  const {
    data: updateWorkspaceChannelData,
    error: updateWorkspaceChannelError,
  } = await updateWorkspaceChannel({ workspaceId, channelId: data[0]?.id });

  if (updateWorkspaceChannelError)
    return { error: 'Unable to update workspace channel' };

  return data[0] ? data[0] : null;
};

const getUserWorkspaceChannels = async (
  workspaceId: string,
  userId: string,
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('workspaces')
    .select('channels')
    .eq('id', workspaceId)
    .single();

  if (error) return [];

  const channelIds = data.channels;

  const { data: channelsData, error: channelError } = await supabase
    .from('channels')
    .select('*')
    .in('id', channelIds);

  if (channelError) return [];

  const userWorkspaceChannels = channelsData.filter((el) =>
    el.members.includes(userId),
  );

  return userWorkspaceChannels as Channel[];
};

export { createChannel, getUserWorkspaceChannels };

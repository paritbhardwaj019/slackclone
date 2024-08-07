import { z } from 'zod';

export const createChannelSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Channel name must be at least 2 characters long' }),
});

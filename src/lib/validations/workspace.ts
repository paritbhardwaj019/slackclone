import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, {
    message: 'Workspace name should be atleast 2 characters long',
  }),
});

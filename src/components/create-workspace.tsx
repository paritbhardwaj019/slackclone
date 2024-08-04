'use client';

import { createWorkspace } from '@/lib/actions/workspace';
import { createWorkspaceSchema } from '@/lib/validations/workspace';
import { generateSlug } from '@/utils/generateSlug';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { ImageUpload } from './image-upload';
import { Typography } from './typography';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

export const CreateWorkspace = () => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit({ name }: z.infer<typeof createWorkspaceSchema>) {
    const slug = generateSlug(name);
    const invite_code = uuid();
    const result = await createWorkspace({
      name,
      invite_code,
      slug,
    });

    if (result?.error) {
      console.log(result?.error);
      return toast.error("Couln't create workspace. Please try again");
    }

    toast.success('Workspace created successfully');
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger className="py-2">
        <Typography variant="p">+ Add Workspace</Typography>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4" className="font-semibold">
              Create Workspace
            </Typography>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="p" className="text-sm lg:text-sm">
                      Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <ImageUpload />

            <div className="flex justify-end">
              <Button type="submit">
                <Typography variant="p">Submit</Typography>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

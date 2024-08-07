import { Dispatch, SetStateAction, useState } from 'react';
import { createChannelSchema } from '@/lib/validations/channel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Typography } from './typography';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

interface CreateChannelDialogProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
}

export const CreateChannelDialog = ({
  dialogOpen,
  setDialogOpen,
  workspaceId,
  userId,
}: CreateChannelDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createChannelSchema>>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createChannelSchema>) => {
    const { name } = data;
    console.log(name);
  };

  if (!dialogOpen) return null;

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen((prev) => !prev)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h4" className="font-semibold">
              Create a channel
            </Typography>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="p">Channel name</Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter channel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="mt-6">
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

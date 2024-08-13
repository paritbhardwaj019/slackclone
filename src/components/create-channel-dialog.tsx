import { Dispatch, SetStateAction, useState } from 'react';
import { createChannel } from '@/lib/actions/channel';
import { createChannelSchema } from '@/lib/validations/channel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof createChannelSchema>>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof createChannelSchema>) => {
    try {
      setIsSubmitting(true);

      await createChannel({
        name: data.name,
        userId,
        workspaceId,
      });

      setDialogOpen(false);
      form.reset();
      setIsSubmitting(false);
      router.refresh();
      toast.success('Channel created successfully');
    } catch (error) {
      setIsSubmitting(false);
    }
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

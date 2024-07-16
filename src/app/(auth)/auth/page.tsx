'use client';

import { useState } from 'react';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInWithEmail } from '@/lib/actions/auth';
import { authSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BsSlack } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { RxGithubLogo } from 'react-icons/rx';
import { z } from 'zod';

export default function () {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    setIsAuthenticating(true);
    const response = await signInWithEmail(values);
    const { error } = JSON.parse(response);
    setIsAuthenticating(false);

    if (!error) {
      return;
    }
  };

  return (
    <main className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography variant="h2">Slack</Typography>
        </div>

        <Typography variant="h2" className="mb-3">
          Sign in to your Slack
        </Typography>

        <Typography variant="p" className="opacity-90 mb-7">
          We suggest using the{' '}
          <span className="font-semibold">
            email address that you use at work
          </span>
        </Typography>

        <div className="flex flex-col space-y-4">
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <FcGoogle size={30} />
            <Typography className="text-xl" variant="p">
              Sign in with Google
            </Typography>
          </Button>
          <Button variant="outline" className="py-6 border-2 flex space-x-3">
            <RxGithubLogo size={30} />
            <Typography className="text-xl" variant="p">
              Sign in with Github
            </Typography>
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography variant="p">OR</Typography>
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />

                <Button
                  variant="secondary"
                  type="submit"
                  className="bg-primary-dark hover:bg-primary-dark/90 disabled:bg-primary-dark/90 w-full my-5 text-white"
                  disabled={isAuthenticating}
                >
                  <Typography variant="p">Sign in with email</Typography>
                </Button>

                <div className="px-5 py-4 bg-gray-100 rounded-md">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome />
                    <Typography variant="p">
                      We&rsquo;ll email you a magic code for a password-free
                      sign-in
                    </Typography>
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

"use server";

import { createClient } from "@/utils/supabase/server";

export async function signInWithEmail({ email }: { email: string }) {
  const supabase = createClient();

  const res = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_PUBLIC_ORIGIN,
    },
  });

  return JSON.stringify(res);
}

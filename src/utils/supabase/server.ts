'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface cookieStoreInterface {
  name: string;
  value: string;
  options: CookieOptions;
}

export async function createClient() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies: cookieStoreInterface[]) {
          try {
            cookies.forEach(({ name, value, options }) =>
              cookieStore.set({
                name,
                value,
                ...options,
              }),
            );
          } catch (error) {}
        },
      },
    },
  );

  return supabase;
}

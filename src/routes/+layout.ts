// src/routes/+layout.ts

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

import type { RequestEvent } from './$types'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import { invalidate } from '$app/navigation'

export const load = async ({ fetch, data, depends }: any) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}
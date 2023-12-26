import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Layout from 'components/layout.js'
import { createClient } from '@supabase/supabase-js';//Supabase

export default function Page() {
  const router = useRouter()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const user = useUser()
  if(user){
    // Redirect to '/profile'
  }

  return (
    <Layout
      title="Sign in"
      description="User sign in"
    >
      <h1 className="wt-title">
        Sign in
      </h1>
      {/* insert the Auth component, add the ThemeSupa as well */}
      <Auth 
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
        supabaseClient={supabase}/>
    </Layout>
  )
}

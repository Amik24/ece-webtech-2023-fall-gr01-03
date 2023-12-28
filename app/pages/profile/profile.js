import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Layout from '../../components/Layout.js'

export default function Page() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()
  
  const onClickLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }
  
  // Prepare user data with only email and id
  const userData = user ? { id: user.id, email: user.email } : null;
  
  return (
    <Layout
      title="Profile"
      description="User profile page"
      >
      <h1 className='wt-title'>
        Profile
      </h1>
      <div className="mb-8">
        <button
          className="rounded px-3 py-2 text-white bg-slate-500 hover:bg-blue-500"
          onClick={onClickLogout}
        >
          Sign out
        </button>
      </div>
      {user && (
        <p>Email: {user.email}</p>
      )}
    </Layout>
  )
}

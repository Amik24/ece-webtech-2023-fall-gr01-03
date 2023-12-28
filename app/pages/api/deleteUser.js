// pages/api/deleteUser.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the service key on the server-side
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id } = req.body;
  const { error } = await supabaseServer.auth.api.deleteUser(user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'User deleted successfully.' });
}

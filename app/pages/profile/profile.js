import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Layout from '../../components/Layout.js';
import md5 from 'md5';

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [editingPhone, setEditingPhone] = useState(false);

  // Gravatar URL
  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email?.toLowerCase())}?d=identicon` : '';


  const onClickLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const onDeleteAccount = async () => {
    // Display confirmation dialog
    setShowConfirmation(true);
  };

  const confirmDeleteAccount = async () => {
    // Call the server-side API endpoint to delete the user
    const response = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (response.ok) {
      // Sign the user out after account deletion
      await supabase.auth.signOut();
      router.push('/');
    } else {
      // Handle error, perhaps show an error message to the user
      const errorData = await response.json();
      console.error('Error deleting account:', errorData.error);
      alert('Error deleting account: ' + errorData.error);
    }
  };

  const onCancelDelete = () => {
    setShowConfirmation(false);
  };

  const viewContacts = () => {
    router.push('/admin/contacts'); // Adjust according to your route
  };

  const handlePhoneUpdate = async () => {
    const { data, error } = await supabase.auth.updateUser({
      phone: phoneNumber,
    });

    if (error) {
      alert('Error updating phone number: ' + error.message);
    } else {
      alert('Phone number updated successfully');
      setEditingPhone(false);
    }
  };

  return (
    <Layout title="Profile" description="User profile page">
      <h1 className='wt-title'>Profile</h1>
      <div className="mb-8">
        <button className="rounded px-3 py-2 text-white bg-slate-500 hover:bg-blue-500" onClick={onClickLogout}>
          Sign out
        </button>
        <button className="rounded px-3 py-2 text-white bg-green-500 hover:bg-green-600 ml-4" onClick={viewContacts}>
          Contacts posted
        </button>
        <button className="rounded px-3 py-2 text-white bg-red-500 hover:bg-red-600 ml-4" onClick={onDeleteAccount}>
          Delete account
        </button>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2>Are you sure you want to delete your account?</h2>
            <div className="mt-4 flex justify-around">
              <button className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600" onClick={confirmDeleteAccount}>Yes, Delete</button>
              <button className="rounded bg-blue-500 text-white px-4 py-2 hover:bg-blue-600" onClick={onCancelDelete}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
      {user && (
        <>
        <img src={gravatarUrl} alt="User Avatar" className="rounded-full w-20 h-20 mr-4" />
        <p>Email: {user.email}</p>
        <p>Last Sign In: {new Date(user.amr[0].timestamp * 1000).toLocaleString()}</p>
        <div>
            {editingPhone ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button type="button" onClick={handlePhoneUpdate}>Save Phone Number</button>
                <button type="button" onClick={() => setEditingPhone(false)}>Cancel</button>
              </form>
            ) : (
              <>
                <p>Phone: {user.phone || 'Not provided'}</p>
                <button onClick={() => setEditingPhone(true)}>
                  {user.phone ? 'Change Phone Number' : 'Insert a Phone Number'}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

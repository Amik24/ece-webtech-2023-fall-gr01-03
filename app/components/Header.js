import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const profile = await response.json();
          setUserProfile(profile);
        } else if (response.status === 401) {
          console.log('User is not logged in.');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white text-black p-8 flex">
      <div className="flex-grow">
        <Link href={`/`}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src="/ECE_LOGO_2021_web.png" alt="ECE Logo" width={150} height={50} />
            <span>Web technologies</span>
          </div>
        </Link>
      </div>
      <ul className="list-none m-0 p-0 inline-flex space-x-8">
        <li>
          <Link legacyBehavior href="/articles"><a>Articles</a></Link>
        </li>
        <li>
          <Link legacyBehavior href="/about"><a>About us</a></Link>
        </li>
        <li>
          <Link legacyBehavior href="/contacts"><a>Contact us</a></Link>
        </li>
        {userProfile && (
          <li className="flex items-center space-x-2">
            <span>👤</span>
            <span>{userProfile.username}</span>
          </li>
        )}
      </ul>
    </header>
  );
}

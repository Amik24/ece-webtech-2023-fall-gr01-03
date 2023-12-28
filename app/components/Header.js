import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function Header() {
  const user = useUser();
  const router = useRouter();

  const handleAuthButtonClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-black p-8 flex">
      <div className="flex-grow">
        <Link href="/" passHref>
          <span className="flex items-center space-x-2 cursor-pointer">
            <Image src="/ECE_LOGO_2021_web.png" alt="ECE Logo" width={150} height={50} priority />
            <span>Web technologies</span>
          </span>
        </Link>
      </div>
      <ul className="list-none m-0 p-0 inline-flex space-x-8">
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/about">About us</Link>
        </li>
        <li>
          <Link href="/contacts">Contact us</Link>
        </li>
        <li>
          <button onClick={handleAuthButtonClick} className="text-sm font-semibold">
            {user ? user.email : 'Sign in'}
          </button>
        </li>
      </ul>
    </header>
  );
}

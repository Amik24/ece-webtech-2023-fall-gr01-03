import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';
import md5 from 'md5';

export default function Header() {
  const user = useUser();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  // Gravatar URL
  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email?.toLowerCase())}?d=identicon` : '';

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
          <Link href="/articles">
            <button className="text-sm font-semibold hover:underline">Articles</button>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <button className="text-sm font-semibold hover:underline">About us</button>
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            <button className="text-sm font-semibold hover:underline">Contact us</button>
          </Link>
        </li>
        {user ? (
          <li ref={dropdownRef} className="relative">
            <img src={gravatarUrl} alt="User Avatar" className="rounded-full w-10 h-10 mr-2" />
            <button
              className="rounded px-3 py-2 text-white bg-blue-500 hover:bg-blue-600"
              onClick={toggleDropdown}
            >
              Profile
            </button>
            {isDropdownVisible && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-xl z-50"
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <ul className="list-none m-0 p-0">
                  <li className="border-b border-gray-200">
                    <Link href="/profile/profile">
                      <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">My Information</button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/myreviews">
                      <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">My Reviews</button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link href="/login">
              <button className="rounded px-3 py-2 text-white bg-blue-500 hover:bg-blue-600">
                Sign in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

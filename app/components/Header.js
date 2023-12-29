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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white py-4 px-8 flex justify-between items-center">
      <Link href="/" passHref>
        <span className="flex items-center space-x-2 cursor-pointer">
          <Image src="/ECE_LOGO_2021_web.png" alt="ECE Logo" width={150} height={50} priority />
          <span className="font-semibold text-xl">Web Technologies</span>
        </span>
      </Link>
      <ul className="list-none m-0 p-0 flex space-x-8 items-center">
        <li>
          <Link href="/movies">
            <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">Movies</span>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">About Us</span>
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">Contact Us</span>
          </Link>
        </li>
        {user ? (
          <li className="relative flex items-center space-x-2">
            <button
              className="rounded-full border-2 border-white px-3 py-2 text-white hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
              onClick={toggleDropdown}
            >
              Profile
            </button>
            {isDropdownVisible && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded z-50"
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <ul className="list-none m-0 p-0">
                  <li className="border-b border-gray-400">
                    <Link href="/profile/profile">
                      <span className="block px-4 py-2 hover:bg-gray-300 w-full text-left cursor-pointer">My Information</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/review">
                      <span className="block px-4 py-2 hover:bg-gray-300 w-full text-left cursor-pointer">My Reviews</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <Link href="/profile/profile"> {/* Add this */}
                <a>
                  <img src={gravatarUrl} alt="User Avatar" className="rounded-full w-12 h-12 ml-2" />
                </a>
            </Link>

          </li>
        ) : (
          <li>
            <Link href="/login">
              <span className="rounded-full border-2 border-white px-3 py-2 text-white hover:bg-yellow-500 hover:text-gray-900 transition duration-300 cursor-pointer">
                Sign In
              </span>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
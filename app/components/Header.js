import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';
import md5 from 'md5';

export default function Header() {
  const user = useUser();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.localStorage.getItem('darkMode') === 'true';
    setDarkMode(prefersDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email?.toLowerCase())}?d=identicon` : '';

  return (
    <header className={`sticky top-0 z-50 py-4 px-8 flex justify-between items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="flex items-center space-x-2 cursor-pointer">
            <Image src="/logo.png" alt="ECE Logo" width={150} height={50} priority />
            <span className="font-semibold text-3xl">IWatched&apos;IT</span>
          </span>
        </Link>
        {user && (
          <Link href="/watchlist">
            <span className="text-base font-semibold hover:text-yellow-500 cursor-pointer">My Watchlist</span>
          </Link>
        )}
        <Link href="/movies">
          <span className="text-base font-semibold hover:text-yellow-500 cursor-pointer">Movies</span>
        </Link>
        <Link href="/about">
          <span className="text-base font-semibold hover:text-yellow-500 cursor-pointer">About Us</span>
        </Link>
        <Link href="/contacts">
          <span className="text-base font-semibold hover:text-yellow-500 cursor-pointer">Contact Us</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <button onClick={toggleDropdown} className="rounded-full border-2 border-white px-6 py-4 hover:bg-yellow-500 transition duration-300">
              Profile
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 shadow-lg rounded z-50" onMouseLeave={() => setIsDropdownVisible(false)}>
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
            <img src={gravatarUrl} alt="User Avatar" className="rounded-full w-16 h-16" />
          </>
        ) : (
          <Link href="/login">
            <span className="rounded-full border-2 border-white px-6 py-4 hover:bg-yellow-500 transition duration-300 cursor-pointer">Sign In</span>
          </Link>
        )}
        <button onClick={toggleDarkMode} className="rounded-full border-2 border-white px-6 py-4 hover:bg-yellow-500 transition duration-300 cursor-pointer">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

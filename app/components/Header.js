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

  const gravatarUrl = user ? `https://www.gravatar.com/avatar/${md5(user.email?.toLowerCase())}?d=identicon` : '';

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <header className={`sticky top-0 z-50 py-4 px-8 flex justify-between items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
      <Link href="/" passHref>
        <span className="flex items-center space-x-2 cursor-pointer">
          <Image src="/ECE_LOGO_2021_web.png" alt="ECE Logo" width={150} height={50} priority />
          <span className="font-semibold text-xl">Web Technologies</span>
        </span>
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/movies" passHref>
          <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">Movies</span>
        </Link>
        <Link href="/about" passHref>
          <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">About Us</span>
        </Link>
        <Link href="/contacts" passHref>
          <span className="text-sm font-semibold hover:text-yellow-500 cursor-pointer">Contact Us</span>
        </Link>
        {user ? (
          <div className="relative flex items-center space-x-2">
            <button onClick={toggleDropdown} className="rounded-full border-2 border-white px-3 py-2 hover:bg-yellow-500 transition duration-300">
              Profile
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded z-50" onMouseLeave={() => setIsDropdownVisible(false)}>
                <ul className="list-none m-0 p-0">
                  <li className="border-b border-gray-400">
                    <Link href="/profile/profile" passHref>
                      <span className="block px-4 py-2 hover:bg-gray-300 w-full text-left cursor-pointer">My Information</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile/review" passHref>
                      <span className="block px-4 py-2 hover:bg-gray-300 w-full text-left cursor-pointer">My Reviews</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <Link href="/profile/profile" passHref>
              <span>
                <img src={gravatarUrl} alt="User Avatar" className="rounded-full w-12 h-12" />
              </span>
            </Link>
          </div>
        ) : (
          <Link href="/login" passHref>
            <span className="rounded-full border-2 border-white px-3 py-2 hover:bg-yellow-500 transition duration-300 cursor-pointer">Sign In</span>
          </Link>
        )}
      </nav>
      <button onClick={toggleDarkMode} className="rounded-full border-2 border-white px-3 py-2 hover:bg-yellow-500 transition duration-300 cursor-pointer">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

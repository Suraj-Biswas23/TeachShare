"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUser } from '@clerk/nextjs';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser(); // Check if the user is signed in

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/icon.png" alt="TeachShare Logo" width={40} height={40} />
            <span className="ml-2 font-bold text-2xl text-blue-600">TeachShare</span>
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition duration-300">Explore</Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600 transition duration-300">Community</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About Us</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
                <Link href="/sign-up" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold">Sign Up</Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <Link href="/explore" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">Explore</Link>
            <Link href="/community" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">Community</Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">About Us</Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="block py-2 bg-blue-600 text-white px-4 rounded-full hover:bg-blue-700 transition duration-300 text-center">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
                <Link href="/sign-up" className="block py-2 mt-2 bg-blue-600 text-white px-4 rounded-full hover:bg-blue-700 transition duration-300 text-center">Sign Up</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

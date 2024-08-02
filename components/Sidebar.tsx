'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/link';
import { Home, Upload, Search, Book, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: LinkProps['href'];
  icon: ReactNode;
  text: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text, isActive }) => (
  <Link href={href} className={`flex items-center space-x-2 px-6 py-3 ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-600'}`}>
    {icon}
    <span>{text}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Getting the pathname of the website

  return (
    <div className="bg-indigo-800 text-white w-64 flex-shrink-0 min-h-screen">
      <div className="p-5">
        <span className="text-2xl font-extrabold">TeachShare</span>
      </div>
      <nav className="mt-5">
        <SidebarLink href="/dashboard" icon={<Home size={20} />} text="Home" isActive={pathname === '/dashboard'} />
        <SidebarLink href="/dashboard/upload-resource" icon={<Upload size={20} />} text="Upload Resource" isActive={pathname === '/dashboard/upload-resource'} />
        <SidebarLink href="/dashboard/search-resources" icon={<Search size={20} />} text="Search Resources" isActive={pathname === '/dashboard/search-resources'} />
        <SidebarLink href="/dashboard/my-resources" icon={<Book size={20} />} text="My Resources" isActive={pathname === '/dashboard/my-resources'} />
        <SidebarLink href="/dashboard/chat-with-pdf" icon={<MessageCircle size={20} />} text="Chat with PDF" isActive={pathname === '/dashboard/chat-with-pdf'} />
      </nav>
    </div>
  );
};

export default Sidebar;

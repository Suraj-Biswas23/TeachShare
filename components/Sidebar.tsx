'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/link';
import { Home, Upload, Search, Book, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  href: LinkProps['href'];
  icon: ReactNode;
  text: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text, isActive, isCollapsed }) => (
  <Link href={href} className={`flex items-center space-x-2 px-6 py-3 ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-600'} ${isCollapsed ? 'justify-center' : ''}`}>
    {icon}
    {!isCollapsed && <span>{text}</span>}
  </Link>
);

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Getting the pathname of the website
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse

  return (
    <div className={`bg-indigo-800 text-white ${isCollapsed ? 'w-20' : 'w-64'} flex-shrink-0 min-h-screen transition-all duration-300`}>
      <div className={`p-5 flex items-center justify-between ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <span className="text-2xl font-extrabold">TeachShare</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <nav className="mt-5">
        <SidebarLink href="/dashboard" icon={<Home size={20} />} text="Home" isActive={pathname === '/dashboard'} isCollapsed={isCollapsed} />
        <SidebarLink href="/dashboard/upload-resource" icon={<Upload size={20} />} text="Upload Resource" isActive={pathname === '/dashboard/upload-resource'} isCollapsed={isCollapsed} />
        <SidebarLink href="/dashboard/search-resources" icon={<Search size={20} />} text="Search Resources" isActive={pathname === '/dashboard/search-resources'} isCollapsed={isCollapsed} />
        <SidebarLink href="/dashboard/my-resources" icon={<Book size={20} />} text="My Resources" isActive={pathname === '/dashboard/my-resources'} isCollapsed={isCollapsed} />
        <SidebarLink href="/dashboard/chat-with-pdf" icon={<MessageCircle size={20} />} text="Chat with PDF" isActive={pathname === '/dashboard/chat-with-pdf'} isCollapsed={isCollapsed} />
      </nav>
    </div>
  );
};

export default Sidebar;

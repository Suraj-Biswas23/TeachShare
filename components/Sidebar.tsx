import React, { ReactNode } from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/link';
import { Home, Upload, Search, Book, MessageCircle } from 'lucide-react';

interface SidebarLinkProps {
  href: LinkProps['href'];
  icon: ReactNode;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text }) => (
  <Link href={href} className="flex items-center space-x-2 px-6 py-3 hover:bg-indigo-700">
    {icon}
    <span>{text}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  return (
    <div className="bg-indigo-800 text-white w-64 flex-shrink-0 min-h-screen">
      <div className="p-5">
        <span className="text-2xl font-extrabold">TeachShare</span>
      </div>
      <nav className="mt-5">
        <SidebarLink href="/dashboard" icon={<Home size={20} />} text="Home" />
        <SidebarLink href="/dashboard/upload" icon={<Upload size={20} />} text="Upload Resource" />
        <SidebarLink href="/dashboard/search" icon={<Search size={20} />} text="Search Resources" />
        <SidebarLink href="/dashboard/my-resources" icon={<Book size={20} />} text="My Resources" />
        <SidebarLink href="/dashboard/chat" icon={<MessageCircle size={20} />} text="Chat with PDF" />
      </nav>
    </div>
  );
};

export default Sidebar;
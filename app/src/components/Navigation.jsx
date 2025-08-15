

'use client';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { Search, Library as LibraryIcon, Music, Home } from 'lucide-react';

const Navigation = () => {
  const library = useSelector((state) => state?.library?.library || []);
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Inicio',
      active: pathname === '/'
    },
    {
      href: '/search',
      icon: Search,
      label: 'Buscar',
      active: pathname === '/search'
    },
    {
      href: '/library',
      icon: LibraryIcon,
      label: 'Biblioteca',
      active: pathname === '/library',
      badge: library?.length > 0 ? library.length : null
    }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Biblioteca Musical RTK
              </h1>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="flex gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;



'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchResults from '../src/components/SearchResults';
import Library from '../src/components/Library';
import { Search, Library as LibraryIcon, Music } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const library = useSelector((state: any) => state?.library || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Biblioteca Musical
              </h1>
            </div>
            
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'search'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}
              >
                <Search className="h-5 w-5" />
                Buscar Canciones
              </button>
              
              <button
                onClick={() => setActiveTab('library')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                  activeTab === 'library'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80'
                }`}
              >
                <LibraryIcon className="h-5 w-5" />
                Mi Biblioteca
                {library?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {library.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'search' ? <SearchResults /> : <Library />}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">
            Biblioteca Musical - Descubre y organiza tu música favorita
          </p>
        </div>
      </footer>
    </div>
  );
}

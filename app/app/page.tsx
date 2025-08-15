

'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Search, Library as LibraryIcon, Music, TrendingUp, Play, Volume2, Headphones } from 'lucide-react';

export default function HomePage() {
  const library = useSelector((state: any) => state?.library?.library || []);
  const { results } = useSelector((state: any) => state?.search || {});

  const recentSongs = library.slice(-3).reverse();

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
                Biblioteca Musical RTK
              </h1>
            </div>
            
            <nav className="flex gap-4">
              <Link href="/search">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg">
                  <Search className="h-5 w-5" />
                  Buscar Canciones
                </button>
              </Link>
              
              <Link href="/library">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg relative">
                  <LibraryIcon className="h-5 w-5" />
                  Mi Biblioteca
                  {library?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {library.length}
                    </span>
                  )}
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Headphones className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tu Biblioteca Musical
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              con Redux Toolkit
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre, organiza y disfruta de tu música favorita. Busca canciones de TheAudioDB e iTunes y crea tu colección personal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg text-lg font-medium flex items-center gap-3">
                <Search className="h-6 w-6" />
                Empezar a buscar
              </button>
            </Link>
            
            {library?.length > 0 && (
              <Link href="/library">
                <button className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-lg text-lg font-medium flex items-center gap-3">
                  <LibraryIcon className="h-6 w-6" />
                  Ver mi biblioteca
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Funcionalidades
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Búsqueda Avanzada</h4>
              <p className="text-gray-600">
                Busca canciones en TheAudioDB e iTunes con información detallada de artistas, álbumes y géneros musicales.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <LibraryIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Biblioteca Personal</h4>
              <p className="text-gray-600">
                Organiza tu música favorita en una biblioteca personal con estadísticas y organización por artistas.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Redux Toolkit</h4>
              <p className="text-gray-600">
                Estado global gestionado con Redux Toolkit, incluyendo operaciones asíncronas y manejo de errores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Songs Section */}
      {recentSongs.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">
                Agregadas recientemente
              </h3>
              <Link href="/library">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Ver todas →
                </button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {recentSongs.map((song: any, index: number) => (
                <Link key={song?.trackId || index} href={`/song/${song?.trackId}`}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-4 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {song?.artworkUrl100 ? (
                          <img
                            src={song.artworkUrl100}
                            alt={song?.trackName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {song?.trackName}
                        </h4>
                        <p className="text-gray-600 truncate">
                          {song?.artistName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {song?.collectionName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {library?.length || 0}
              </div>
              <div className="text-gray-600">
                Canciones en biblioteca
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(library?.map((song: any) => song?.artistName)).size || 0}
              </div>
              <div className="text-gray-600">
                Artistas únicos
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {library?.filter((song: any) => song?.source === 'theaudiodb').length || 0}
              </div>
              <div className="text-gray-600">
                De TheAudioDB
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {library?.filter((song: any) => song?.source === 'itunes').length || 0}
              </div>
              <div className="text-gray-600">
                De iTunes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded">
                <Music className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-600">
                Biblioteca Musical RTK - Redux Toolkit Implementation
              </span>
            </div>
            
            <div className="text-sm text-gray-500">
              Powered by TheAudioDB & iTunes APIs
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


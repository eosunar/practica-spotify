

'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong, clearLibrary } from '../redux/slices/librarySlice';
import { resetResults } from '../redux/slices/searchSlice';
import { Trash2, Music, Library as LibraryIcon, Play, Volume2, Trash, Search } from 'lucide-react';
import Link from 'next/link';

const Library = () => {
  const library = useSelector((state) => state.library?.library || []);
  const dispatch = useDispatch();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  const handleClearLibrary = () => {
    dispatch(clearLibrary());
    setShowClearConfirm(false);
  };

  const goToSearch = () => {
    dispatch(resetResults());
  };

  // Agrupar canciones por artista
  const songsByArtist = library.reduce((acc, song) => {
    const artist = song?.artistName || 'Artista desconocido';
    if (!acc[artist]) {
      acc[artist] = [];
    }
    acc[artist].push(song);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
              <LibraryIcon className="h-8 w-8" />
              Mi Biblioteca Musical
            </h2>
            <p className="text-purple-100">
              {library?.length ?? 0} {(library?.length ?? 0) === 1 ? 'canción' : 'canciones'} en tu colección personal
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            {library?.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                Limpiar
              </button>
            )}
            
            <Link href="/search">
              <button
                onClick={goToSearch}
                className="px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium"
              >
                <Search className="h-4 w-4" />
                Buscar más
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ¿Limpiar biblioteca?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción eliminará todas las canciones de tu biblioteca. No se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClearLibrary}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sí, limpiar
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Library Content */}
      {library?.length > 0 ? (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{library.length}</div>
              <div className="text-gray-600">Canciones totales</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{Object.keys(songsByArtist).length}</div>
              <div className="text-gray-600">Artistas únicos</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {library.filter(song => song?.source === 'theaudiodb').length}
              </div>
              <div className="text-gray-600">De TheAudioDB</div>
            </div>
          </div>

          {/* Songs by Artist */}
          {Object.entries(songsByArtist).map(([artist, songs]) => (
            <div key={artist} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">{artist}</h3>
                <p className="text-gray-600">
                  {songs.length} {songs.length === 1 ? 'canción' : 'canciones'}
                </p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {songs.map((song, index) => (
                  <div
                    key={song?.trackId || `library-song-${index}`}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Album Artwork */}
                      <div className="relative w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                        {song?.artworkUrl100 ? (
                          <img
                            src={song.artworkUrl100}
                            alt={`${song?.trackName || 'Canción'} artwork`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Source Badge */}
                        <div className="absolute top-1 right-1">
                          <div className={`px-1 py-0.5 rounded text-xs font-bold ${
                            song?.source === 'theaudiodb' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-800 text-white'
                          }`}>
                            {song?.source === 'theaudiodb' ? 'DB' : 'IT'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Song Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg line-clamp-1">
                          {song?.trackName || 'Sin título'}
                        </h4>
                        <p className="text-gray-600 line-clamp-1">
                          {song?.collectionName || 'Álbum desconocido'}
                        </p>
                        
                        {/* Additional Info */}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {song?.genre && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {song.genre}
                            </span>
                          )}
                          {song?.year && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {song.year}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {song?.previewUrl && (
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
                            <Volume2 className="h-5 w-5" />
                          </button>
                        )}
                        
                        <Link href={`/song/${song?.trackId}`}>
                          <button className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors">
                            <Play className="h-5 w-5" />
                          </button>
                        </Link>
                        
                        <button
                          onClick={() => handleRemoveSong(song?.trackId)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          title="Eliminar de mi biblioteca"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <LibraryIcon className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              Tu biblioteca está vacía
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              ¡Empieza a crear tu colección musical personal! Busca canciones y agrégalas a tu biblioteca para tener acceso rápido a toda tu música favorita.
            </p>
            
            <Link href="/search">
              <button
                onClick={goToSearch}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto font-medium"
              >
                <Search className="h-5 w-5" />
                Buscar canciones
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;


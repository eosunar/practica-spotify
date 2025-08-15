
'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong } from '../redux/libraryActions';
import { Trash2, Music, Library as LibraryIcon } from 'lucide-react';

const Library = () => {
  const library = useSelector(state => state?.library || []);
  const dispatch = useDispatch();

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <LibraryIcon className="h-6 w-6 text-purple-600" />
          Mi Biblioteca Musical
        </h2>
        <p className="text-gray-600 mt-2">
          {library?.length ?? 0} {(library?.length ?? 0) === 1 ? 'canción' : 'canciones'} en tu biblioteca
        </p>
      </div>

      {library?.length > 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4">
            {library?.map((song, index) => (
              <div
                key={song?.trackId || `library-song-${index}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
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
                        <Music className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {song?.trackName || 'Sin título'}
                    </h4>
                    <p className="text-gray-600 truncate">
                      {song?.artistName || 'Artista desconocido'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {song?.collectionName || 'Álbum desconocido'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {song?.previewUrl && (
                      <audio controls className="h-8">
                        <source src={song.previewUrl} type="audio/mpeg" />
                      </audio>
                    )}
                    <button
                      onClick={() => handleRemoveSong(song?.trackId)}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
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
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <LibraryIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tu biblioteca está vacía
            </h3>
            <p className="text-gray-600">
              Busca canciones y agrégalas a tu biblioteca personal para empezar a crear tu colección musical.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

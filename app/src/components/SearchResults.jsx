
'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../redux/libraryActions';
import { Search, Plus, Music } from 'lucide-react';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const searchSongs = async () => {
    if (!searchTerm?.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm?.trim())}&media=music&entity=song&limit=20`
      );
      if (!response?.ok) throw new Error('Error en la búsqueda');
      
      const data = await response.json();
      setResults(data?.results || []);
    } catch (error) {
      console.error('Error searching songs:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = (song) => {
    const songData = {
      trackId: song?.trackId,
      trackName: song?.trackName || 'Sin título',
      artistName: song?.artistName || 'Artista desconocido',
      collectionName: song?.collectionName || 'Álbum desconocido',
      artworkUrl100: song?.artworkUrl100 || '/placeholder-album.png',
      previewUrl: song?.previewUrl
    };
    dispatch(addSong(songData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Search className="h-6 w-6 text-blue-600" />
          Buscar Canciones
        </h2>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchSongs()}
              placeholder="Ingresa el título de la canción o artista..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
          <button
            onClick={searchSongs}
            disabled={loading || !searchTerm?.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Buscando canciones...</p>
        </div>
      )}

      {results?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Resultados de búsqueda ({results?.length ?? 0})
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {results?.map((song, index) => (
              <div
                key={song?.trackId || `song-${index}`}
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
                  
                  <button
                    onClick={() => handleAddSong(song)}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    title="Agregar a mi biblioteca"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && results?.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No se encontraron canciones para "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;



'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, clearError } from '../redux/slices/searchSlice';
import { addSong } from '../redux/slices/librarySlice';
import { Search, Plus, Music, AlertCircle, Loader2, RefreshCw, Volume2 } from 'lucide-react';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  const { results, loading, error, searchTerm: currentSearchTerm } = useSelector(
    (state) => state.search
  );

  const handleSearch = () => {
    if (searchTerm?.trim()) {
      dispatch(fetchSongs(searchTerm.trim()));
    }
  };

  const handleAddSong = (song) => {
    dispatch(addSong(song));
  };

  const handleRetry = () => {
    if (currentSearchTerm) {
      dispatch(fetchSongs(currentSearchTerm));
    }
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <Search className="h-8 w-8 text-blue-600" />
          Buscar Canciones
        </h2>
        <p className="text-gray-600 mb-4">
          Busca tus canciones favoritas usando TheAudioDB y iTunes
        </p>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSearch()}
              placeholder="Ingresa el nombre de la canción, artista o álbum..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-700"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !searchTerm?.trim()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2 font-medium min-w-[140px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Buscar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Error en la búsqueda</h3>
              <p className="text-red-600">{error}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRetry}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Reintentar
              </button>
              <button
                onClick={clearErrorMessage}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Buscando canciones...
            </h3>
            <p className="text-gray-600">
              Consultando TheAudioDB y iTunes para encontrar los mejores resultados
            </p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && results?.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">
              Resultados para "{currentSearchTerm}"
            </h3>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {results.length} {results.length === 1 ? 'canción' : 'canciones'}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((song, index) => (
              <div
                key={song?.trackId || `song-${index}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  {/* Album Artwork */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex-shrink-0">
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
                    <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
                      {song?.trackName || 'Sin título'}
                    </h4>
                    <p className="text-gray-700 font-medium mb-1 line-clamp-1">
                      {song?.artistName || 'Artista desconocido'}
                    </p>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {song?.collectionName || 'Álbum desconocido'}
                    </p>
                    
                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-2 mb-3">
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
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {song?.previewUrl && (
                        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                          <Volume2 className="h-4 w-4 text-gray-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAddSong(song)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        title="Agregar a mi biblioteca"
                      >
                        <Plus className="h-4 w-4" />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && results?.length === 0 && currentSearchTerm && !error && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-gray-600 mb-4">
              No se encontraron canciones para "{currentSearchTerm}"
            </p>
            <p className="text-sm text-gray-500">
              Intenta con términos diferentes o verifica la ortografía
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;


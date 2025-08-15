

'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addSong, removeSong } from '@/src/redux/slices/librarySlice';
import { ArrowLeft, Music, Play, Plus, Trash2, ExternalLink, Calendar, Disc3, Volume2, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

interface SongDetail {
  trackId: string;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100?: string;
  previewUrl?: string;
  genre?: string;
  year?: string;
  description?: string;
  source: string;
}

export default function SongDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;
  
  const [songDetail, setSongDetail] = useState<SongDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si la canción está en la biblioteca
  const library = useSelector((state: any) => state?.library?.library || []);
  const songId = Array.isArray(id) ? id[0] : id;
  const isInLibrary = library.some((song: any) => song?.trackId?.toString() === songId?.toString());

  useEffect(() => {
    const fetchSongDetail = async () => {
      if (!songId) return;

      setLoading(true);
      try {
        // Buscar primero en la biblioteca local
        const localSong = library.find((song: any) => song?.trackId?.toString() === songId?.toString());
        
        if (localSong) {
          setSongDetail(localSong);
          setLoading(false);
          return;
        }

        // Si no está en la biblioteca, buscar en TheAudioDB
        const audioDBResponse = await fetch(
          `https://www.theaudiodb.com/api/v1/json/2/track.php?h=${encodeURIComponent(songId)}`
        );

        if (audioDBResponse?.ok) {
          const audioDBData = await audioDBResponse.json();
          
          if (audioDBData?.track && audioDBData.track[0]) {
            const track = audioDBData.track[0];
            const songData = {
              trackId: track.idTrack,
              trackName: track.strTrack,
              artistName: track.strArtist,
              collectionName: track.strAlbum,
              artworkUrl100: track.strTrackThumb,
              previewUrl: track.strMusicVid,
              genre: track.strGenre,
              year: track.intYearReleased,
              description: track.strDescriptionEN,
              source: 'theaudiodb'
            };
            setSongDetail(songData);
          } else {
            throw new Error('Canción no encontrada');
          }
        } else {
          throw new Error('Error al obtener detalles de la canción');
        }
      } catch (error: any) {
        setError(error.message || 'Error al cargar la canción');
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetail();
  }, [songId, library]);

  const handleAddToLibrary = () => {
    if (songDetail) {
      dispatch(addSong(songDetail));
    }
  };

  const handleRemoveFromLibrary = () => {
    if (songDetail) {
      dispatch(removeSong(songDetail.trackId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Detalles de la canción</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Cargando detalles de la canción...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Error</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error al cargar</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!songDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Canción no encontrada</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">La canción que buscas no existe o no está disponible.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detalles de la canción</h1>
        </div>

        {/* Song Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Album Artwork */}
            <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="aspect-square relative">
                {songDetail?.artworkUrl100 ? (
                  <img
                    src={songDetail.artworkUrl100}
                    alt={`${songDetail?.trackName} artwork`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="h-24 w-24 text-gray-400" />
                  </div>
                )}
                
                {/* Source Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    songDetail?.source === 'theaudiodb' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-800 text-white'
                  }`}>
                    {songDetail?.source === 'theaudiodb' ? 'TheAudioDB' : 'iTunes'}
                  </div>
                </div>
              </div>
            </div>

            {/* Song Information */}
            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {songDetail?.trackName || 'Sin título'}
                </h2>
                <p className="text-xl text-gray-700 mb-1">
                  {songDetail?.artistName || 'Artista desconocido'}
                </p>
                <p className="text-lg text-gray-600">
                  {songDetail?.collectionName || 'Álbum desconocido'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {songDetail?.genre && (
                  <div className="flex items-center gap-2">
                    <Disc3 className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{songDetail.genre}</span>
                  </div>
                )}
                
                {songDetail?.year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{songDetail.year}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {songDetail?.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-4">
                    {songDetail.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {songDetail?.previewUrl && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Play className="h-5 w-5" />
                    Reproducir preview
                  </button>
                )}

                {isInLibrary ? (
                  <button
                    onClick={handleRemoveFromLibrary}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                    Eliminar de biblioteca
                  </button>
                ) : (
                  <button
                    onClick={handleAddToLibrary}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    Agregar a biblioteca
                  </button>
                )}

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Heart className="h-5 w-5" />
                  Me gusta
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Share2 className="h-5 w-5" />
                  Compartir
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <Link href="/search">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Buscar más canciones
                  </button>
                </Link>
                
                <Link href="/library">
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    Ver mi biblioteca
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


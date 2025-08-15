

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Song {
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

interface SearchState {
  results: Song[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

// Estado inicial
const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  searchTerm: ''
};

// Thunk asíncrono para buscar canciones
export const fetchSongs = createAsyncThunk<
  { songs: Song[]; searchTerm: string },
  string,
  { rejectValue: string }
>(
  'search/fetchSongs',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      if (!searchTerm?.trim()) {
        throw new Error('Término de búsqueda requerido');
      }

      // Usar tanto TheAudioDB como iTunes como fallback
      const audioDBResponse = await fetch(
        `https://www.theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(searchTerm.trim())}`
      );

      let songs = [];
      
      if (audioDBResponse?.ok) {
        const audioDBData = await audioDBResponse.json();
        
        if (audioDBData?.track && Array.isArray(audioDBData.track)) {
          songs = audioDBData.track.map((track: any) => ({
            trackId: track.idTrack || `audiodb-${Date.now()}-${Math.random()}`,
            trackName: track.strTrack || 'Sin título',
            artistName: track.strArtist || 'Artista desconocido',
            collectionName: track.strAlbum || 'Álbum desconocido',
            artworkUrl100: track.strTrackThumb || '/placeholder-album.png',
            previewUrl: track.strMusicVid,
            genre: track.strGenre,
            year: track.intYearReleased,
            description: track.strDescriptionEN,
            source: 'theaudiodb'
          }));
        }
      }

      // Si no hay resultados de TheAudioDB, usar iTunes como fallback
      if (songs.length === 0) {
        const itunesResponse = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm.trim())}&media=music&entity=song&limit=20`
        );
        
        if (itunesResponse?.ok) {
          const itunesData = await itunesResponse.json();
          
          if (itunesData?.results && Array.isArray(itunesData.results)) {
            songs = itunesData.results.map((song: any) => ({
              trackId: song.trackId || `itunes-${Date.now()}-${Math.random()}`,
              trackName: song.trackName || 'Sin título',
              artistName: song.artistName || 'Artista desconocido',
              collectionName: song.collectionName || 'Álbum desconocido',
              artworkUrl100: song.artworkUrl100 || '/placeholder-album.png',
              previewUrl: song.previewUrl,
              genre: song.primaryGenreName,
              source: 'itunes'
            }));
          }
        }
      }

      if (songs.length === 0) {
        throw new Error(`No se encontraron canciones para "${searchTerm}"`);
      }

      return {
        songs,
        searchTerm: searchTerm.trim()
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al buscar canciones');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.error = null;
      state.searchTerm = '';
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.songs;
        state.searchTerm = action.payload.searchTerm;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.results = [];
        state.error = action.payload || 'Error desconocido';
      });
  }
});

// Export actions
export const { resetResults, clearError } = searchSlice.actions;

// Export reducer
export default searchSlice.reducer;


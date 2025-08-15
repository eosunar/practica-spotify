

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface LibraryState {
  library: Song[];
}

const initialState: LibraryState = {
  library: []
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<Song>) => {
      // Verificar que no exista ya la canción en la biblioteca
      const songExists = state.library.some(
        song => song?.trackId === action.payload?.trackId
      );
      
      if (!songExists) {
        state.library.push(action.payload);
      }
    },
    removeSong: (state, action: PayloadAction<string>) => {
      state.library = state.library.filter(
        song => song?.trackId !== action.payload
      );
    },
    clearLibrary: (state) => {
      state.library = [];
    }
  }
});

// Export actions
export const { addSong, removeSong, clearLibrary } = librarySlice.actions;

// Export reducer
export default librarySlice.reducer;


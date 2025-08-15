
export const addSong = (song) => ({
  type: 'ADD_SONG',
  payload: song
});

export const removeSong = (songId) => ({
  type: 'REMOVE_SONG',
  payload: songId
});

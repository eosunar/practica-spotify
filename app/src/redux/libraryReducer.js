
const initialState = {
  library: []
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SONG':
      // Verificar que no exista ya la canción en la biblioteca
      if (state?.library?.some(song => song?.trackId === action.payload?.trackId)) {
        return state;
      }
      return {
        ...state,
        library: [...(state?.library || []), action.payload]
      };
    
    case 'REMOVE_SONG':
      return {
        ...state,
        library: (state?.library || []).filter(song => song?.trackId !== action.payload)
      };
    
    default:
      return state;
  }
};

export default libraryReducer;

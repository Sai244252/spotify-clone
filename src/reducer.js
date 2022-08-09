export const initialState = {
  user: null,
  playlists: [],
  playlistsTotal: 0,
  playing: false,
  item: null,
  discover_weekly: null,
  playlistId: null,
  selectedSong: null,
  uri: null,
  // "6FQQiTpYnfc5803p84bQp1",
  //remove token and set it to null after developing.
  token: null,
  // "BQAWQ9QihkzIq9BvKYTiJEjakcSUyHkK-6g_CbgyoIpYxnz2yMvf2LvmZH8cbN8uKzo9BX5hXqhY0_Kqd5ALyrQLzIU_Kx1_EG-zoJO-VYFJHuEAN_gcRb5RzhwQOXxb8g7ryNMPRX2770OCuLzXyOJ0BNzOjkUyzH91a8s97jyUN_4JxRcHR49KdbnDTrArmpfd4Phd0qgxRRltf4rb",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "CLEAR_TOKEN":
      return {
        token: null,
      };

    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists };

    case "SET_PLAYLISTS_TOTAL":
      return { ...state, playlistsTotal: action.playlistsTotal };

    case "SET_DISCOVER_WEEKLY":
      return { ...state, discover_weekly: action.discover_weekly };

    case "SET_PLAYLISTID":
      return { ...state, playlistId: action.playlistId };

    case "SET_SELECTED_SONG":
      return { ...state, selectedSong: action.selectedSong };

    case "SET_URI":
      return {
        ...state,
        uri: action.uri,
      };

    default:
      return state;
  }
};

export default reducer;

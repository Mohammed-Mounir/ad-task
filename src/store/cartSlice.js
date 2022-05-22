import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSingers: [],
  selectedAlbums: [],
  selectedSongs: [],
  count: 0,
  totalAmount: 0,
  order: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSinger: (state, action) => {
      const singer = action.payload;
      const singerExist = state.selectedSingers.find(
        (singerName) => singerName === singer.name
      );

      if (singerExist) {
        state.selectedSingers = state.selectedSingers.filter(
          (singerName) => singerName !== singer.name
        );
        state.selectedAlbums = state.selectedAlbums.filter(
          (ar) => !singer.albums.find((rm) => rm.title === ar.title)
        );
      } else {
        state.selectedSingers.push(singer.name);
        state.selectedAlbums = state.selectedAlbums.concat(singer.albums);
      }
      state.selectedSongs =
        state.selectedAlbums.map((album) => album.songs).flat() || [];
      state.count = state.selectedSongs.length;
      state.totalAmount = state.selectedSongs.reduce(
        (prevTotal, song) => prevTotal + song.price,
        0
      );
    },
    toggleAlbums: (state, action) => {
      const albumExist = state.selectedAlbums.find(
        (album) => album.title === action.payload.title
      );

      if (albumExist) {
        state.selectedAlbums = state.selectedAlbums.filter(
          (album) => album.title !== action.payload.title
        );
      } else {
        state.selectedAlbums.push(action.payload);
      }
      state.selectedSongs =
        state.selectedAlbums.map((album) => album.songs).flat() || [];
      state.count = state.selectedSongs.length;
      state.totalAmount = state.selectedSongs.reduce(
        (prevTotal, song) => prevTotal + song.price,
        0
      );
    },
    toggleSongs: (state, action) => {
      const songExist = state.selectedSongs.find(
        (song) => song.title === action.payload.title
      );

      if (songExist) {
        state.selectedSongs = state.selectedSongs.filter(
          (song) => song.title !== action.payload.title
        );
      } else {
        state.selectedSongs.push(action.payload);
      }
      state.count = state.selectedSongs.length;
      state.totalAmount = state.selectedSongs.reduce(
        (prevTotal, song) => prevTotal + song.price,
        0
      );
    },
    addOrder: (state, action) => {
      state.order = {
        ...action.payload,
        count: state.count,
        totalAmount: state.totalAmount,
        songs: state.selectedSongs,
      };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

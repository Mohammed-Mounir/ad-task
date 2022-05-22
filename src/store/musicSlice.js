import { createSlice } from "@reduxjs/toolkit";
import { MUSIC_DATA } from "../data";

const initialState = {
  music: MUSIC_DATA.map((singer) => ({ ...singer, isChecked: false })),
  // albmus: MUSIC_DATA.map((music) => ({
  //   singer: music.name,
  //   albums: [...music.albums],
  // })),
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    toggleSingerStatus: (state, action) => {
      state.music = state.music.map((singer) =>
        singer.name === action.payload.name
          ? { ...singer, isChecked: !singer.isChecked }
          : singer
      );
    },
  },
});

export const musicActions = musicSlice.actions;

export default musicSlice;

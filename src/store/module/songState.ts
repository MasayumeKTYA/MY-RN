import { createSlice } from '@reduxjs/toolkit';
import { MusicDataType } from '../../type/index';

export const counterSlice = createSlice({
  name: 'songState',
  initialState: {
    songId: 0,
    status: true,
    songList: [] as MusicDataType[],
    currentIndex: -1,
    isLoaclPlay: false,
  },
  reducers: {
    setSongId: (state, action) => {
      state.songId = action.payload;
    },
    setPlay: (state, action) => {
      state.status = action.payload;
    },
    setSongLists: (state, action) => {
      if (action.payload.list !== undefined) {
        state.songList = action.payload.list;
      }
      state.currentIndex = action.payload.index;
    },
    setNetPlay: (state, action) => {
      state.isLoaclPlay = action.payload;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setSongId, setPlay, setSongLists, setNetPlay } =
  counterSlice.actions;

export default counterSlice.reducer;

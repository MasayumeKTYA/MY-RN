import { createSlice } from '@reduxjs/toolkit';
import { listType } from '../../type/detail';

export const counterSlice = createSlice({
  name: 'songState',
  initialState: {
    songId: 0,
    status: true,
    songList: [] as listType[],
    currentIndex: -1,
  },
  reducers: {
    setSongId: (state, action) => {
      state.songId = action.payload;
    },
    setPlay: (state, action) => {
      state.status = action.payload;
    },
    setSongLists: (state, action) => {
      state.songList = action.payload.list;
      state.currentIndex = action.payload.index;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setSongId, setPlay, setSongLists } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { MusicDataType } from '@/type/index';
import { ExternalDirectoryPath } from 'react-native-fs';
export const counterSlice = createSlice({
  name: 'songState',
  initialState: {
    status: true,
    songList: [] as MusicDataType[],
    currentIndex: -1,
    isShow: true,
    savePath: ExternalDirectoryPath + '/downLoad'
  },
  reducers: {
    //设置播放状态
    setPlay: (state, action) => {
      state.status = action.payload;
    },
    //设置播放列表
    setSongLists: (state, action) => {
      if (action.payload.list !== undefined) {
        state.songList = action.payload.list;
      }
      state.currentIndex = action.payload.index;
    },
    //是否显示
    changeShow: (state, action) => {
      state.isShow = action.payload;
    },
    //设置路径
    setDownload: (state, action) => {
      state.savePath = action.payload
    }
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setPlay, setSongLists, changeShow, setDownload } = counterSlice.actions;

export default counterSlice.reducer;

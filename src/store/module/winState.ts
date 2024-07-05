import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'winState',
  initialState: {
    value: false,
  },
  reducers: {
    showWin: state => {
      state.value = true;
    },
    hidenWin: state => {
      state.value = false;
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { showWin, hidenWin } = counterSlice.actions;

export default counterSlice.reducer;
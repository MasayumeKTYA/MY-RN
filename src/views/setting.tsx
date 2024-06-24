import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

// import { decrement, increment } from '../store/module/winState';
import { useAppSelector, useAppDispatch } from '../store/index';

export const Setting = () => {
  // const count = useSelector<TypedUseSelectorHook<RootStates>>(
  //   state => state.conter.value,
  // );
  // const count = useAppSelector(state => state.conter.value);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>我是设置页面</Text>
      {/* <Button title="++" onPress={() => dispatch(increment())} />
      <Text>{count}</Text>
      <Button title="--" onPress={() => dispatch(decrement())} /> */}
    </View>
  );
};

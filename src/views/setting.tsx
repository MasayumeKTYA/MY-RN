import React from 'react';
import { View, Text, Animated, Button, Modal } from 'react-native';
// import { decrement, increment } from '../store/module/winState';
import { useAppSelector, useAppDispatch } from '../store/index';
import { ToastProp } from '../type';
const Setting: React.FC<ToastProp> = ({ Toast }) => {
  const { showToast } = Toast;
  // const count = useSelector<TypedUseSelectorHook<RootStates>>(
  //   state => state.conter.value,
  // );
  // const count = useAppSelector(state => state.conter.value);
  const dispatch = useAppDispatch();
  const duringToast = () => {
    showToast('ss');
  };
  return (
    <Animated.View>
      <Text>我是设置页面</Text>
      <Button title="++" onPress={duringToast} />

      {/* <Text>{count}</Text>
      <Button title="--" onPress={() => dispatch(decrement())} /> */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}></Modal> */}
    </Animated.View>
  );
};
export default Setting;

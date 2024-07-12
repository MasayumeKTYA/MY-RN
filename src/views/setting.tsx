import React from 'react';
import {
  View,
  Text,
  Animated,
  Button,
  Modal,
  ImageBackground,
  StatusBar,
} from 'react-native';
// import { decrement, increment } from '../store/module/winState';
import { useAppSelector, useAppDispatch } from '../store/index';
import { ToastProp } from '../type';
StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);
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
    <ImageBackground
      resizeMode="cover"
      source={require('../assest/text.jpg')}
      style={{ flex: 1 }}>
      <Text>我是设置页面</Text>
      <Button title="++" onPress={duringToast} />
    </ImageBackground>
  );
};
export default Setting;

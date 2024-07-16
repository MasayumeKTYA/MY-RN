import React from 'react';
import {
  View,
  Text,
  Animated,
  Button,
  Modal,
  ImageBackground,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
// import { decrement, increment } from '../store/module/winState';
import { useAppSelector, useAppDispatch } from '@/store/index';
import { ToastProp } from '@/type';
import { defaultIcon } from '@/icon';
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
  const InitData = [];
  for (let index = 0; index < 100; index++) {
    InitData.push({ id: `${index}`, title: `测试${index}` });
  }
  console.log(InitData);

  return (
    <ImageBackground
      resizeMode="cover"
      source={defaultIcon}
      style={{ flex: 1 }}>
      <Text>setting</Text>
    </ImageBackground>
  );
};
export default Setting;

import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import {
  Header,
  getHeaderTitle,
  PlatformPressable,
  HeaderBackButton,
} from '@react-navigation/elements';
import { androidRipple } from '../../../shareVar';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RightScreen from './RightScreen';
import { showWin } from '../../../store/module/winState';
import { useAppDispatch, useAppSelector } from '../../../store/index';
const Headers = (prop: NativeStackHeaderProps) => {
  const { options, route, navigation } = prop;
  const winState = useAppSelector(state => state.winState.value);
  const dispatch = useAppDispatch();
  return (
    <Header
      headerLeft={() => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      )}
      headerRight={() => (
        <PlatformPressable
          onPress={() => dispatch(showWin())}
          style={{
            right: 20,
            width: 26,
            height: 26,
            alignItems: 'center',
            // borderRadius: '50%',
          }}
          android_ripple={androidRipple}>
          <FontAwesome6 name="ellipsis-vertical" size={26} />
          {winState && <RightScreen navigation={navigation} />}
        </PlatformPressable>
      )}
      // {...options}
      headerTitleAlign={options.headerTitleAlign}
      title={getHeaderTitle(options, route.name)}
    />
  );
};
export default Headers;

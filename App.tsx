/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
// import type {PropsWithChildren} from 'react';

import store from '@/store/index';
import { Provider } from 'react-redux';
import Router from '@/router/index';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Toast } from '@/components';
import { MemoType } from '@/type';
import { StatusBar } from 'react-native';
import MemoAudio from '@/components/audio';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primary: 'rgb(255, 45, 85)',
  },
};
StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);
const MemoRouter = React.memo((Toast: MemoType) => <Router Toast={Toast} />);

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [toastVisible, setToastVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const showToast = useCallback((text = '') => {
    setText(text);
    setToastVisible(true);
    console.log(text);
  }, []);
  const hideToast = useCallback(() => {
    setToastVisible(false);
    setText('');
  }, []);

  useEffect(() => {
    console.log('根组件');
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <MemoRouter showToast={showToast} hideToast={hideToast} />
        <MemoAudio showToast={showToast} hideToast={hideToast} />
      </NavigationContainer>
      <Toast visible={toastVisible} title={text} />
    </Provider>
  );
}

export default App;

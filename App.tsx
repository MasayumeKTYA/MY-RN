/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
// import type {PropsWithChildren} from 'react';

import store from './src/store/index';
import { Provider } from 'react-redux';
import Router from './src/router/index';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Toast } from './src/components/Toast';
import Audio from './src/components/audio';
import { MemoType } from './src/type';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    primary: 'rgb(255, 45, 85)',
  },
};

const MemoRouter = React.memo((Toast: MemoType) => (
  <NavigationContainer theme={MyTheme}>
    <Router Toast={Toast} />
  </NavigationContainer>
));
const MemoAudio = React.memo<MemoType>(({ showToast, hideToast }) => (
  <Audio showToast={showToast} hideToast={hideToast} />
));
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [toastVisible, setToastVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const showToast = useCallback((text: string) => {
    setText(text);
    setToastVisible(true);
    console.log(text);
  }, []);
  const hideToast = useCallback(() => {
    setToastVisible(false);
    setText('');
  }, []);
  return (
    <Provider store={store}>
      <MemoRouter
        showToast={(text = '') => showToast(text)}
        hideToast={hideToast}
      />
      <Toast visible={toastVisible} title={text} />
      <MemoAudio
        showToast={(text = '') => showToast(text)}
        hideToast={hideToast}
      />
    </Provider>
  );
}

export default App;

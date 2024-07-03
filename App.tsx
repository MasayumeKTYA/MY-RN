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

const ProvideComponetn = React.memo((Toast: MemoType) => (
  <NavigationContainer theme={MyTheme}>
    <Router Toast={Toast} />
  </NavigationContainer>
));
function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [toastVisible, setToastVisible] = React.useState(false);

  const showToast = useCallback(() => {
    setToastVisible(true);
  }, []);
  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);
  return (
    <Provider store={store}>
      {/* <View style={{ flex: 1 }}> */}

      {/* </View> */}

      <ProvideComponetn showToast={showToast} hideToast={hideToast} />
      <Toast visible={toastVisible} />
      <Audio showToast={showToast} hideToast={hideToast} />
    </Provider>
  );
}

export default App;

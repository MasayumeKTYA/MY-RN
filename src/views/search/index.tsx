import getDefaultHeaderHeight from '../../tool/ulits';
import { Text, View, StyleSheet, Platform } from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Header,
  getHeaderTitle,
  PlatformPressable,
  HeaderBackButton,
} from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import Input from './headerTitle';
import { useState } from 'react';
import HeaderRight from './headerRight';
function Search(prop: NativeStackScreenProps<ParamListBase>) {
  const { navigation } = prop;
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  // On models with Dynamic Island the status bar height is smaller than the safe area top inset.
  const hasDynamicIsland = Platform.OS === 'ios' && insets.top > 50;
  const statusBarHeight = hasDynamicIsland ? insets.top - 5 : insets.top;
  const height = getDefaultHeaderHeight(frame, false, statusBarHeight);
  const [searchVal, setSearchVal] = useState('');
  const TextChange = (val: string) => {
    setSearchVal(val);
  };
  const clickSearch = () => {};
  return (
    <View style={css.box}>
      {/* <View style={[css.header, { height }]}></View> */}
      <Header
        headerLeft={() => (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        )}
        title=""
        headerTitle={() => <Input value={searchVal} onInput={TextChange} />}
        headerRight={() => <HeaderRight onSearch={clickSearch} />}
      />
      <View style={css.lists}>
        <Text>212</Text>
      </View>
    </View>
  );
}
const css = StyleSheet.create({
  box: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  header: {},
  lists: {},
});
export default Search;

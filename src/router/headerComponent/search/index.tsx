import { Text, View } from 'react-native';
import {
  Header,
  getHeaderTitle,
  PlatformPressable,
  HeaderBackButton,
} from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
const Search = (prop: NativeStackHeaderProps) => {
  const { options, route } = prop;
  return (
    <Header
      title={getHeaderTitle(options, route.name)}
      headerTitleAlign={options.headerTitleAlign}
    />
  );
};
export default Search;

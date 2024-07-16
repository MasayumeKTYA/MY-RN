import {
  DrawerHeaderProps,
  DrawerToggleButton,
  DrawerContent,
  DrawerView,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';

type DrawHomeHeader = (props: DrawerHeaderProps) => React.ReactNode;
const HomeHeader: DrawHomeHeader = ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  console.log(title);

  return (
    <View>
      <View style={{ height: 40 }}></View>
      <DrawerToggleButton />
      <Text>sss</Text>
    </View>
  );
};

export default HomeHeader;

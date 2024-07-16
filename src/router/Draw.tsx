import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { Index, Setting } from '@/views/index.ts';
import { MemoType, ToastProp } from '@/type/music.js';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import HomeHeader from '@/views/index/header';
const Drawer = createDrawerNavigator();

type RouterProps = {
  Toast: MemoType;
};
type OptionType =
  | DrawerNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => DrawerNavigationOptions)
  | undefined;
type routeType = {
  component: React.FC<ToastProp>;
  name: string;
  options?: OptionType;
};
const route: routeType[] = [
  {
    component: Index,
    name: 'Home',
    options: {
      //   header: HomeHeader,
      //   drawerLabel: '首页',
      title: '首页',
    },
  },
];
const MyDrawer = (prop: RouterProps) => {
  const { Toast } = prop;
  const baseOptions: OptionType = {
    headerTitleAlign: 'center',
  };

  return (
    <Drawer.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        // drawerContent:()=>
      }}>
      {route.map(item => {
        const option = { ...baseOptions, ...item.options };
        return (
          <Drawer.Screen options={option} name={item.name} key={item.name}>
            {(prop: NativeStackScreenProps<ParamListBase>) => (
              <item.component {...prop} Toast={Toast} />
            )}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
};
export default MyDrawer;

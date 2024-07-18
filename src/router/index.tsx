import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import React from 'react';
import { MemoType, ToastProp } from '@/type/index';
import {
  Index,
  Setting,
  LocalFile,
  SelectFile,
  Detail,
  Search,
  ImportSong,
  SongDetail,
} from '@/views/index.ts';
import MyDrawer from './Draw.tsx';
import { DrawerScreenProps } from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
type RouterProps = {
  Toast: MemoType;
};
type OptionType =
  | NativeStackNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => NativeStackNavigationOptions)
  | undefined;
type routeType = {
  component: React.FC<ToastProp>;
  name: string;
  options?: OptionType;
};
const route: routeType[] = [
  {
    component: MyDrawer,
    name: 'index',
    options: {
      headerShown: false,
    },
  },
  {
    component: Setting,
    name: 'setting',
    options: {
      title: '设置',
    },
  },
  {
    component: Detail,
    name: 'detail',
    options: {
      title: '歌单详情',
    },
  },
  {
    component: LocalFile,
    name: 'localFile',
    options: {
      headerShown: false,
      title: '本地',
    },
  },
  {
    component: SelectFile,
    name: 'selectFile',
    options: {
      title: '选择本地歌曲',
    },
  },
  {
    component: Search,
    name: 'search',
    options: {
      headerShown: false,
    },
  },
  {
    component: ImportSong,
    name: 'importSong',
    options: {
      title: '导入外部歌单',
    },
  },
  {
    component: SongDetail,
    name: 'SongDetail',
    options: {
      headerShown: false,
      animation: 'slide_from_bottom',
    },
  },
];
export default function Router(prop: RouterProps) {
  const { Toast } = prop;
  const baseOptions: OptionType = {
    statusBarStyle: 'dark',
    headerTitleAlign: 'center',
    animation: 'slide_from_right',
    statusBarTranslucent: true,
    statusBarColor: 'transparent',
  };

  return (
    <Stack.Navigator>
      {route.map(item => {
        const option = { ...baseOptions, ...item.options };
        return (
          <Stack.Screen name={item.name} options={option} key={item.name}>
            {(prop: DrawerScreenProps<ParamListBase>) => (
              <item.component {...prop} Toast={Toast} />
            )}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
}

import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import React from 'react';
import { MemoType, ToastProp } from '../type/index';

import {
  Index,
  Setting,
  LocalFile,
  SelectFile,
  Detail,
  Search,
  ImportSong,
  SongDetail,
} from '../views/index.ts';
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
    component: Index,
    name: 'index',
    options: {
      headerShown: false,
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
    component: Setting,
    name: 'setting',
    options: {
      headerShown: false,
      title: '设置',
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
            {(prop: NativeStackScreenProps<ParamListBase>) => (
              <item.component {...prop} Toast={Toast} />
            )}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
}

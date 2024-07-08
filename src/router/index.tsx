import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import Headers from './headerComponent/localFile';
import { MemoType } from '../type/index';

import {
  Index,
  Setting,
  LocalFile,
  SelectFile,
  Detail,
  Search,
  ImportSong,
} from '../views/index.ts';
const Stack = createNativeStackNavigator();
type RouterProps = {
  Toast: MemoType;
};
export default function Router(prop: RouterProps) {
  const { Toast } = prop;
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Index}
        name="index"
        options={{
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: '歌单详情',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <Detail {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="setting"
        options={{
          title: '设置',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <Setting {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="localFile"
        component={LocalFile}
        options={{
          header: Headers,
          title: '本地',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}
      />
      <Stack.Screen
        name="selectFile"
        options={{
          title: '选择本地歌曲',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <SelectFile {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="search"
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <Search {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="importSong"
        options={{
          title: '导入外部歌单',
          headerTitleAlign: 'center',
          headerShown: true,
          statusBarStyle: 'dark',
          statusBarColor: '#fff',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <ImportSong {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

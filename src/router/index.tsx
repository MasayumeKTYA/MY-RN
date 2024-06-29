import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Index } from '../views/index';
import { Setting } from '../views/setting';
import { LocalFile } from '../views/local';
import { SelectFile } from '../views/selectFile';
import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { MemoType } from '../type/index';
import Detail from '../views/detail';
import Headers from './headerComponent/localFile';
import Search from '../views/search/index';
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
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: '歌单详情',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <Detail {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          title: '设置',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="localFile"
        component={LocalFile}
        options={{
          header: Headers,
          title: '本地',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name="selectFile"
        options={{
          title: '选择本地歌曲',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
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
        }}>
        {(prop: NativeStackScreenProps<ParamListBase>) => (
          <Search {...prop} Toast={Toast} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

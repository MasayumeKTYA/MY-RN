import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { ToastProp } from '@/type';
import { PlatformPressable } from '@react-navigation/elements';
import { useAppSelector } from '@/store/index';
const Setting: React.FC<ToastProp> = ({ Toast, navigation }) => {
  const { showToast, hideToast } = Toast;
  const path = useAppSelector(state => state.songState.savePath);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={style.SettingBox}>下载</Text>
      <PlatformPressable
        style={style.SettingItem}
        onPress={async () => navigation.navigate('downloadPath')}>
        <Text style={style.itemFont}>下载路径</Text>
        <Text
          style={[
            style.itemFont,
            {
              width: 150,
              textAlign: 'right',
            },
          ]}
          numberOfLines={4}>
          {path}
        </Text>
      </PlatformPressable>
    </View>
  );
};
const style = StyleSheet.create({
  SettingBox: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  SettingItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemFont: {
    color: '#000',
  },
});
export default Setting;

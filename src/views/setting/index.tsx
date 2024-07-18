import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { ToastProp } from '@/type';
import { defaultIcon } from '@/icon';
import { PlatformPressable } from '@react-navigation/elements';
const Setting: React.FC<ToastProp> = ({ Toast }) => {
  const { showToast } = Toast;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={style.SettingBox}>下载</Text>
      <PlatformPressable style={style.SettingItem}>
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
          sadadad
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
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemFont: {
    color: '#000',
  },
});
export default Setting;

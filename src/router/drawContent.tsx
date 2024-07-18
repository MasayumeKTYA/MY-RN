import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { memo } from 'react';

const DrawerBox: React.FC<DrawerContentComponentProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  return (
    <DrawerContentScrollView>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#000' }}>zy音乐</Text>
      </View>
      <DrawerItem
        label="设置"
        onPress={() => {
          navigation.navigate('setting');
        }}></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default memo(DrawerBox, () => true);

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { hidenWin } from '../../../store/module/winState';
import { useAppDispatch } from '../../../store/index';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
interface RightScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
}
const RightScreen = ({ navigation }: RightScreenProps) => {
  const dispatch = useAppDispatch();
  const pressFile = () => {
    dispatch(hidenWin());
    navigation.navigate('selectFile');
  };
  return (
    <PlatformPressable style={rightTop.box} onPress={pressFile}>
      <FontAwesome6 name="file-circle-plus" size={20} style={rightTop.pic} />
      <Text style={rightTop.font}>选择本地文件夹</Text>
    </PlatformPressable>
  );
};

const rightTop = StyleSheet.create({
  box: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.8,
    shadowRadius: 48,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  font: {
    color: '#000',
    padding: 10,
  },
  pic: {
    marginLeft: 20,
  },
});
export default RightScreen;

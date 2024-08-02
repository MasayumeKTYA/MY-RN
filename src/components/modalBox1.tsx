import { StyleSheet, Text, View } from 'react-native';
import Img from '@/components/Image';
import { PlatformPressable } from '@react-navigation/elements';
type ModalBox1Type = {
  data: string | undefined;
  onClick?: () => void;
};
const ModalBox1: React.FC<ModalBox1Type> = ({ data, onClick }) => {
  return (
    <PlatformPressable style={audio.box} onPress={() => onClick && onClick()}>
      <Text style={audio.font1} numberOfLines={1}>
        {data}
      </Text>
    </PlatformPressable>
  );
};
const audio = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },

  font1: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
export default ModalBox1;

import { StyleSheet, Text, View } from 'react-native';
import Img from '@/components/Image';
import { PlatformPressable } from '@react-navigation/elements';
type ModalBox1Type = {
  data: any;
};
const ModalBox1: React.FC<ModalBox1Type> = ({ data }) => {
  console.log(data);

  return (
    <PlatformPressable style={audio.box}>
      <Text style={audio.font1}>{data.name}</Text>
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

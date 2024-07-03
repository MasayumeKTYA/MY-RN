import { StyleSheet, Text, View } from 'react-native';
import Img from '../../components/Image';
import { PlatformPressable } from '@react-navigation/elements';
import { QQListsType } from '../../type/api';
interface AudioBoxProps {
  data: QQListsType;
  onPress: (id: number) => void;
}
const ModalAudio: React.FC<AudioBoxProps> = ({ data, onPress }) => {
  return (
    <PlatformPressable style={audio.box} onPress={() => onPress(data.id)}>
      <Img style={audio.container} uri={data.picurl} net={true} />
      <View>
        <Text style={audio.font1}>{data.title}</Text>
        <Text style={audio.font2}>{data.num}首</Text>
      </View>
    </PlatformPressable>
  );
};
const audio = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  picBG: {
    backgroundColor: '#efefef',
    width: 50,
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    width: 50,
    height: 50,

    marginRight: 20,
  },
  container1: {
    width: 50,
    height: 50,

    marginRight: 20,
  },
  font1: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  font2: {
    fontSize: 12,
  },
});
export default ModalAudio;

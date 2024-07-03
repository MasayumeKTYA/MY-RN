import { StyleSheet, Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

type EmptyProps = { size?: number };
const Empty: React.FC<EmptyProps> = ({ size = 60 }) => {
  console.log(size);

  return (
    <View style={emp.empty}>
      <Fontisto name="file-2" color={'#000'} size={size} />
      <Text style={emp.emptyFont}>暂无文件~</Text>
    </View>
  );
};

const emp = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFont: {
    marginTop: 10,
    fontSize: 17,
    color: '#000',
  },
});
export default Empty;

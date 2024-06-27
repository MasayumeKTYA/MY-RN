import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
type InputProp = {
  value: string;
  onInput: (text: string) => void;
};
const Input: React.FC<InputProp> = prop => {
  const { value, onInput } = prop;
  return (
    <View style={css.box}>
      <AntDesign size={16} name="search1" style={css.picture} />
      <TextInput
        value={value}
        style={css.search}
        placeholder="请搜索..."
        onChangeText={text => onInput(text)}
      />
    </View>
  );
};
const css = StyleSheet.create({
  box: {
    // backgroundColor: 'pink',
    width: 200,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 50,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    marginLeft: 10,
  },
  search: {
    marginLeft: 10,
  },
});
export default Input;

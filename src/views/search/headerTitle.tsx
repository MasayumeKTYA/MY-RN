import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
type InputProp = {
  value: string;
  onInput: (text: string) => void;
  onKeyPress: () => void;
};
const Input: React.FC<InputProp> = prop => {
  const { value, onInput, onKeyPress } = prop;
  return (
    <View style={css.box}>
      <AntDesign size={16} name="search1" style={css.picture} />
      <TextInput
        value={value}
        style={css.search}
        placeholder="请搜索..."
        onChangeText={text => onInput(text)}
        autoFocus={true}
        onSubmitEditing={onKeyPress}
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
    width: 150,
    marginLeft: 10,
  },
});
export default Input;
